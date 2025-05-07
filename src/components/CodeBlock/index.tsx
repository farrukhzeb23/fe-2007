import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import styles from './CodeBlock.module.css';

type Props = {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  maxWidth?: string;
};

function CodeBlock({ code, language = 'javascript', showLineNumbers = true }: Props) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  // Map common file extensions to Prism language codes
  const getLanguageFromType = (type: string): string => {
    const languageMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'jsx',
      ts: 'typescript',
      tsx: 'tsx',
      py: 'python',
      json: 'json',
      md: 'markdown',
      css: 'css',
      html: 'html',
      yml: 'yaml',
      yaml: 'yaml',
      sh: 'bash',
      bash: 'bash',
    };

    return languageMap[type.toLowerCase()] || type.toLowerCase();
  };

  const prismLanguage = getLanguageFromType(language);

  const codeLines = code.split('\n');
  const lineNumbersContent = codeLines.map((_, i) => i + 1).join('\n');

  return (
    <div className="code-block-container">
      <div className={styles.codeContent}>
        {showLineNumbers && (
          <pre className={styles.lineNumbers}>
            <code>{lineNumbersContent}</code>
          </pre>
        )}
        <pre className={`language-${prismLanguage}`}>
          <code ref={codeRef} className={`language-${prismLanguage}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
