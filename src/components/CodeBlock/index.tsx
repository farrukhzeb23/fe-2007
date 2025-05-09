import { useEffect, useRef, useState } from 'react';
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
  url?: string;
  language: string;
  showLineNumbers?: boolean;
  maxWidth?: string;
};

function CodeBlock({
  code: propCode,
  url,
  language = 'javascript',
  showLineNumbers = true,
}: Props) {
  const codeRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(!!url);
  const [code, setCode] = useState(propCode);

  // Fetch code from URL if provided
  useEffect(() => {
    if (url) {
      setLoading(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          setCode(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching code:', error);
          setCode(`// Error fetching code from ${url}: ${error.message}`);
          setLoading(false);
        });
    } else {
      setCode(propCode);
    }
  }, [url, propCode]);

  useEffect(() => {
    if (codeRef.current && !loading) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language, loading]);

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
      txt: 'text',
      go: 'go',
    };

    return languageMap[type.toLowerCase()] || type.toLowerCase();
  };

  const prismLanguage = getLanguageFromType(language);

  const codeLines = code.split('\n');
  const lineNumbersContent = codeLines.map((_, i) => i + 1).join('\n');

  if (loading) {
    const skeletonLines = Array(8)
      .fill(0)
      .map((_, i) => <div key={i} className={styles.skeletonLine}></div>);

    return (
      <div className="code-block-container">
        <div className={styles.codeContent}>
          {showLineNumbers && (
            <pre className={styles.lineNumbers}>
              <code>
                {Array(8)
                  .fill(0)
                  .map((_, i) => i + 1)
                  .join('\n')}
              </code>
            </pre>
          )}
          <pre className={`language-${prismLanguage}`}>
            <div className={styles.skeletonLoader}>{skeletonLines}</div>
          </pre>
        </div>
      </div>
    );
  }

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
