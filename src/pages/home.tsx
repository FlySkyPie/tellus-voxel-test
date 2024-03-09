import Markdown from "react-markdown";
import "github-markdown-css/github-markdown.css";

import introMarkdown from "../../README.md?raw";

export const Home: React.FC = () => {
  return (
    <div className="mt-8">
      <Markdown className="markdown-body">{introMarkdown}</Markdown>
    </div>
  );
};
