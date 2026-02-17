// BlogPreview.jsx (Updated: Author removed from List preview)
import React, { useState } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle,
  ChevronRight,
  Square,
  Minus,
} from "lucide-react";

const BlogPreview = ({ meta, coverPreview, sections }) => {
  const allBlocks = sections
    ? sections.flatMap((section) => section.items)
    : [];
  const [openAccordion, setOpenAccordion] = useState(null);

  // Helper: Bold only the first word of the list heading
  const formatListHeading = (text) => {
    if (!text || text.trim() === "") return null;
    const words = text.trim().split(" ");
    const firstWord = words[0];
    const rest = words.slice(1).join(" ");
    return (
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        <span className="font-extrabold">{firstWord}</span>
        {rest ? ` ${rest}` : ""}
      </h3>
    );
  };

  return (
    <article className="max-w-2xl mx-auto bg-white min-h-[600px] shadow-lg rounded-lg overflow-hidden pb-10">
      <div className="h-64 bg-gray-200 w-full relative">
        {coverPreview ? (
          <img
            src={coverPreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <span className="text-sm font-semibold">Cover Image</span>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="mb-8 border-b pb-6">
          <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-3">
            {meta.category || "General"}
          </span>
          <div className="flex mt-3 items-center gap-2">
            <Calendar size={18} className="text-indigo-500" />
            <span>
              {meta.date
                ? new Date(meta.date).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {meta.mainHeading || "Your Blog Title..."}
          </h1>
          {meta.description && (
            <p className="text-gray-500 mt-4 text-lg leading-relaxed">
              {meta.description}
            </p>
          )}
        </div>

        <div className="space-y-6 text-gray-800">
          {allBlocks.length === 0 && (
            <p className="text-center text-gray-300 italic py-10">
              Start adding sections to see content here...
            </p>
          )}

          {allBlocks.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                >
                  {block.data.text || "Heading..."}
                </h2>
              );
            }
            if (block.type === "paragraph") {
              return (
                <div
                  key={i}
                  className="text-gray-700 leading-7 whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: block.data.text || "Paragraph text...",
                  }}
                />
              );
            }
            if (block.type === "image") {
              return block.data.url ? (
                <div key={i} className="my-6">
                  <img
                    src={block.data.url}
                    alt="Content"
                    className="w-full aspect-video object-cover object-top rounded-2xl shadow-lg border border-gray-100"
                  />
                </div>
              ) : null;
            }
            if (block.type === "list") {
              return (
                <div key={i} className="my-6">
                  {formatListHeading(block.data.heading)}
                  <ul className="grid grid-cols-1 gap-x-1 gap-y-4 bg-gray-50 p-6 rounded-2xl list-none">
                    {block.data.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {block.data.listType === "checklist" && (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        )}
                        {block.data.listType === "arrow" && (
                          <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        )}
                        {block.data.listType === "star" && (
                          <div className="w-5 h-5 text-yellow-500 flex-shrink-0 pb-1 text-xl leading-none flex items-center justify-center">
                            ★
                          </div>
                        )}
                        {block.data.listType === "square" && (
                          <Square className="w-3 h-3 text-blue-500 flex-shrink-0 mt-1 fill-current" />
                        )}
                        {block.data.listType === "dash" && (
                          <Minus className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        )}
                        {(block.data.listType === "bullet" ||
                          !block.data.listType) && (
                          <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0 mt-2" />
                        )}
                        <span className="text-gray-700 leading-relaxed">
                          {item || "List item..."}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-blue-500 bg-gray-50 p-6 my-8 rounded-r-lg italic text-lg text-gray-700"
                >
                  "{block.data.text || "Quote text here..."}"
                  {block.data.author && (
                    <cite className="block text-right text-sm text-gray-500 font-semibold mt-4 not-italic">
                      - {block.data.author}
                    </cite>
                  )}
                </blockquote>
              );
            }
            if (block.type === "button") {
              const btnClasses = {
                primary: "bg-blue-600 text-white hover:bg-blue-700",
                outline:
                  "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
                black: "bg-gray-900 text-white hover:bg-black",
              };
              const styleClass =
                btnClasses[block.data.style] || btnClasses.primary;

              return (
                <div key={i} className="my-8 text-center">
                  <a
                    href={block.data.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition duration-200 shadow-lg ${styleClass}`}
                  >
                    {block.data.text || "Button Text"}{" "}
                    <ExternalLink size={18} />
                  </a>
                </div>
              );
            }
            if (block.type === "accordion") {
              const isOpen = openAccordion === i;
              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg overflow-hidden my-6"
                >
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : i)}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center font-semibold text-left"
                  >
                    {block.data.title || "Accordion Title"}
                    {isOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-6 bg-white border-t">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {block.data.content || "Accordion content goes here..."}
                      </p>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </article>
  );
};

export default BlogPreview;
