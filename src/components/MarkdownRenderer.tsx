/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Safe inline formatter for bold, italic, links, and inline code
  const formatInline = (text: string): React.ReactNode[] => {
    if (!text) return [];

    let currentText = text;
    const parts: React.ReactNode[] = [];
    let keyIndex = 0;

    // We tokenize inline markdown in order of precedence:
    // 1. Links: [text](url)
    // 2. Bold-Italic: ***text***
    // 3. Bold: **text**
    // 4. Italic: *text* or _text_
    // 5. Inline Code: `code`

    const tokenize = (str: string): React.ReactNode => {
      // Very basic regex tokenizing
      // Link Matcher
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      // Bold Matcher
      const boldRegex = /\*\*([^*]+)\*\*/g;
      // Italic Matcher
      const italicRegex = /\*([^*]+)\*/g;
      // Inline Code Matcher
      const codeRegex = /`([^`]+)`/g;

      // Check if it's plain text first
      if (!str.includes('[') && !str.includes('**') && !str.includes('*') && !str.includes('`')) {
        return <span key={keyIndex++}>{str}</span>;
      }

      // We'll do a simple sequential replacement of the first token found
      let earliestIndex = Infinity;
      let matchType: 'link' | 'bold' | 'italic' | 'code' | null = null;
      let matchedText = '';
      let matchedParam1 = ''; // link URL or styled content
      let matchedParam2 = ''; // Link link text
      let matchLength = 0;

      // Test link
      linkRegex.lastIndex = 0;
      const linkMatch = linkRegex.exec(str);
      if (linkMatch && linkMatch.index < earliestIndex) {
        earliestIndex = linkMatch.index;
        matchType = 'link';
        matchedText = linkMatch[0];
        matchedParam1 = linkMatch[1]; // text
        matchedParam2 = linkMatch[2]; // url
        matchLength = linkMatch[0].length;
      }

      // Test bold
      boldRegex.lastIndex = 0;
      const boldMatch = boldRegex.exec(str);
      if (boldMatch && boldMatch.index < earliestIndex) {
        earliestIndex = boldMatch.index;
        matchType = 'bold';
        matchedText = boldMatch[0];
        matchedParam1 = boldMatch[1]; // content
        matchLength = boldMatch[0].length;
      }

      // Test italic
      italicRegex.lastIndex = 0;
      const italicMatch = italicRegex.exec(str);
      if (italicMatch && italicMatch.index < earliestIndex) {
        earliestIndex = italicMatch.index;
        matchType = 'italic';
        matchedText = italicMatch[0];
        matchedParam1 = italicMatch[1]; // content
        matchLength = italicMatch[0].length;
      }

      // Test inline code
      codeRegex.lastIndex = 0;
      const codeMatch = codeRegex.exec(str);
      if (codeMatch && codeMatch.index < earliestIndex) {
        earliestIndex = codeMatch.index;
        matchType = 'code';
        matchedText = codeMatch[0];
        matchedParam1 = codeMatch[1]; // content
        matchLength = codeMatch[0].length;
      }

      if (matchType && earliestIndex !== Infinity) {
        const before = str.substring(0, earliestIndex);
        const after = str.substring(earliestIndex + matchLength);

        return (
          <React.Fragment key={keyIndex++}>
            {before && tokenize(before)}
            {matchType === 'link' && (
              <a
                href={matchedParam2}
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-emerald-700 dark:text-emerald-500 font-medium underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-700/80 hover:text-emerald-800 dark:hover:text-emerald-400 dynamic-link"
              >
                {matchedParam1}
              </a>
            )}
            {matchType === 'bold' && <strong className="font-bold text-slate-900 dark:text-white">{matchedParam1}</strong>}
            {matchType === 'italic' && <em className="italic text-slate-800 dark:text-slate-200">{matchedParam1}</em>}
            {matchType === 'code' && (
              <code className="bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded font-mono text-sm border border-slate-200/50 dark:border-slate-700/50">
                {matchedParam1}
              </code>
            )}
            {after && tokenize(after)}
          </React.Fragment>
        );
      }

      return <span key={keyIndex++}>{str}</span>;
    };

    return [tokenize(currentText)];
  };

  const parseBlocks = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let listType: 'bullet' | 'numeric' | null = null;
    let isInsideCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    const pushListAccumulator = (idx: number) => {
      if (listItems.length > 0) {
        if (listType === 'numeric') {
          elements.push(
            <ol key={`ol-${idx}`} className="list-decimal pl-6 my-4 space-y-2 font-serif text-slate-700 dark:text-slate-300">
              {listItems.map((item, itemIdx) => (
                <li key={`li-${itemIdx}`}>{formatInline(item)}</li>
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ul-${idx}`} className="list-disc pl-6 my-4 space-y-2 font-serif text-slate-700 dark:text-slate-300">
              {listItems.map((item, itemIdx) => (
                <li key={`li-${itemIdx}`}>{formatInline(item)}</li>
              ))}
            </ul>
          );
        }
        listItems = [];
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle raw code block detection
      if (line.trim().startsWith('```')) {
        if (isInsideCodeBlock) {
          // Closing code block
          isInsideCodeBlock = false;
          const codeString = codeBlockContent.join('\n');
          const finalLang = codeBlockLang || 'txt';
          elements.push(
            <div key={`code-block-${i}`} className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-900 text-slate-200 font-mono text-sm leading-relaxed relative group">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-slate-400 text-xs select-none">
                <span>{finalLang.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(codeString, `code-${i}`)}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  title="Salin Kode"
                >
                  {copiedId === `code-${i}` ? (
                    <>
                      <Check className="w-3 H-3 text-emerald-400" />
                      <span className="text-emerald-400 font-sans">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 H-3" />
                      <span className="font-sans">Salin</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto max-h-[400px]">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          codeBlockContent = [];
        } else {
          // Opening code block
          pushListAccumulator(i);
          isInsideCodeBlock = true;
          codeBlockLang = line.replace('```', '').trim();
        }
        continue;
      }

      if (isInsideCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      const trimmed = line.trim();

      // Handle blank lines
      if (!trimmed) {
        pushListAccumulator(i);
        continue;
      }

      // Handle Horizontal Rule
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        pushListAccumulator(i);
        elements.push(<hr key={`hr-${i}`} className="my-8 border-slate-200 dark:border-slate-800" />);
        continue;
      }

      // Handle Headings
      if (trimmed.startsWith('#')) {
        pushListAccumulator(i);
        if (trimmed.startsWith('# ')) {
          elements.push(
            <h1 key={`h1-${i}`} className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-8 mb-4">
              {formatInline(trimmed.substring(2))}
            </h1>
          );
        } else if (trimmed.startsWith('## ')) {
          elements.push(
            <h2 key={`h2-${i}`} className="text-xl md:text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-8 mb-3 border-b border-slate-100 dark:border-zinc-800/80 pb-2">
              {formatInline(trimmed.substring(3))}
            </h2>
          );
        } else if (trimmed.startsWith('### ')) {
          elements.push(
            <h3 key={`h3-${i}`} className="text-lg md:text-xl font-sans font-semibold tracking-tight text-slate-900 dark:text-white mt-6 mb-2">
              {formatInline(trimmed.substring(4))}
            </h3>
          );
        } else {
          const depth = trimmed.indexOf(' ');
          const title = depth > 0 ? trimmed.substring(depth + 1) : trimmed;
          elements.push(
            <h4 key={`h4-${i}`} className="text-base font-sans font-semibold text-slate-900 dark:text-white mt-4 mb-2">
              {formatInline(title)}
            </h4>
          );
        }
        continue;
      }

      // Handle Blockquotes
      if (trimmed.startsWith('>')) {
        pushListAccumulator(i);
        // Multiline quotes can happen, styling looks best as a solid block border
        const quoteText = line.startsWith('> ') ? line.substring(2) : line.substring(1);
        elements.push(
          <blockquote key={`quote-${i}`} className="pl-4 py-1 my-4 border-l-4 border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 italic text-slate-600 dark:text-slate-400 font-serif text-lg leading-relaxed">
            {formatInline(quoteText)}
          </blockquote>
        );
        continue;
      }

      // Handle Bullet Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (listType !== 'bullet') {
          pushListAccumulator(i);
          listType = 'bullet';
        }
        const bulletText = trimmed.substring(2);
        listItems.push(bulletText);
        continue;
      }

      // Handle Numbered Lists
      if (/^\d+\.\s/.test(trimmed)) {
        if (listType !== 'numeric') {
          pushListAccumulator(i);
          listType = 'numeric';
        }
        const markerMatch = trimmed.match(/^(\d+)\.\s(.*)/);
        const bulletText = markerMatch ? markerMatch[2] : trimmed;
        listItems.push(bulletText);
        continue;
      }

      // If we got here and list is still active but current line is not list, close it first
      pushListAccumulator(i);

      // Normal paragraph text
      elements.push(
        <p key={`p-${i}`} className="my-4 font-serif text-slate-700 dark:text-slate-300 text-lg leading-relaxed tracking-wide">
          {formatInline(line)}
        </p>
      );
    }

    // Flush any leftover list items
    pushListAccumulator(lines.length);

    return elements;
  };

  return <div className="space-y-1">{parseBlocks()}</div>;
}
