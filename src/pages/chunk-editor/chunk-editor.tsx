import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

import markdownStr from "./todo.md?raw";

export const ChunkEditor: React.FC = () => {
  return (
    <div className="mt-8">
      <Markdown className="markdown-body" remarkPlugins={[remarkGfm]}>
        {markdownStr}
      </Markdown>
    </div>
  );
};
