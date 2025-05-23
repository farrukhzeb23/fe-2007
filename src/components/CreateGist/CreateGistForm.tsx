import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { useCreateGist } from '../../hooks/useCreateGist';
import styles from './CreateGistForm.module.css';
import TrashIcon from '../../assets/icons/trash-24.svg';

const gistFileSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  content: z.string().min(1, 'Content is required'),
});

const createGistSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  files: z.array(gistFileSchema).min(1, 'At least one file is required'),
});

// Infer TypeScript type from schema
type CreateGistFormValues = z.infer<typeof createGistSchema>;

function CreateGistForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateGist();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGistFormValues>({
    resolver: zodResolver(createGistSchema),
    defaultValues: {
      description: '',
      files: [{ filename: '', content: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const onSubmit = (data: CreateGistFormValues) => {
    try {
      // Transform form data to match the API's stucture
      const filesObject: Record<string, { content: string }> = {};

      data.files.forEach((file) => {
        if (file.filename) {
          filesObject[file.filename] = {
            content: file.content,
          };
        }
      });

      const gistData = {
        description: data.description,
        public: false,
        files: filesObject,
      };

      mutate(gistData, {
        onSuccess: (result) => {
          navigate(`/gists/${result.id}`);
        },
        onError: (error) => {
          console.error('Failed to create gist:', error);
        },
      });
    } catch (error) {
      console.error('Failed to create gist:', error);
    }
  };

  const handleAddFile = () => {
    append({ filename: '', content: '' });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Gist Description"
        {...register('description')}
        className={errors.description ? styles.errorInput : ''}
      />

      <div className={styles.textEditorContainer}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.textEditor}>
            <div className={styles.textEditorHeader}>
              <input
                type="text"
                placeholder="Filename including extension..."
                className={errors.files?.[index]?.filename ? styles.errorInput : ''}
                {...register(`files.${index}.filename`)}
              />

              {index > 0 && (
                <button
                  type="button"
                  className={styles.removeFileBtn}
                  onClick={() => remove(index)}
                >
                  <img src={TrashIcon} alt="Remove" />
                </button>
              )}
            </div>
            <textarea
              {...register(`files.${index}.content`)}
              className={errors.files?.[index]?.content ? styles.errorInput : ''}
            ></textarea>
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.addFileBtn} onClick={handleAddFile}>
          Add File
        </button>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Gist'}
        </button>
      </div>
    </form>
  );
}

export default CreateGistForm;
