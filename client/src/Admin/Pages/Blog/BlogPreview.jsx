import React from "react";
import { ExternalLink } from "lucide-react";

const BlogPreview = ({ meta, coverPreview, sections }) => {
  const allBlocks = sections ? sections.flatMap(section => section.items) : [];

  return (
    <article className="max-w-2xl mx-auto bg-white min-h-[600px] shadow-lg rounded-lg overflow-hidden pb-10">
      
      {/* Cover Image */}
      <div className="h-64 bg-gray-200 w-full relative">
        {coverPreview ? (
          <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
             <span className="text-sm font-semibold">Cover Image</span>
          </div>
        )}
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {meta.title || "Your Blog Title..."}
          </h1>
          {meta.description && (
            <p className="text-gray-500 mt-4 text-lg leading-relaxed">
              {meta.description}
            </p>
          )}
        </div>

        {/* Content Flow */}
        <div className="space-y-6 text-gray-800">
           {allBlocks.length === 0 && (
             <p className="text-center text-gray-300 italic py-10">Start adding sections to see content here...</p>
           )}

           {allBlocks.map((block, i) => {
              
              if (block.type === 'heading') {
                return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{block.data.text || "Heading..."}</h2>;
              }
              
              if (block.type === 'paragraph') {
                return <p key={i} className="text-gray-700 leading-7 whitespace-pre-line">{block.data.text || "Paragraph text..."}</p>;
              }
              
              if (block.type === 'image') {
                return block.data.url ? (
                  <div key={i} className="my-6">
                    <img src={block.data.url} alt="Content" className="w-full rounded-lg shadow-sm border border-gray-100" />
                  </div>
                ) : null;
              }
              
              if (block.type === 'list') {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-gray-700 my-4 bg-gray-50 p-4 rounded-lg">
                    {block.data.items.map((item, idx) => (
                      <li key={idx}>{item || "List item..."}</li>
                    ))}
                  </ul>
                );
              }

              // --- NEW BLOCKS ---
              
              if (block.type === 'quote') {
                return (
                    <blockquote key={i} className="border-l-4 border-blue-500 bg-gray-50 p-4 my-6 rounded-r-lg italic text-gray-700">
                        "{block.data.text || "Quote text here..."}"
                        {block.data.author && <cite className="block text-right text-sm text-gray-500 font-semibold mt-2 not-italic">- {block.data.author}</cite>}
                    </blockquote>
                )
              }

              if (block.type === 'button') {
                const btnClasses = {
                    primary: "bg-blue-600 text-white hover:bg-blue-700",
                    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
                    black: "bg-gray-900 text-white hover:bg-black"
                };
                const styleClass = btnClasses[block.data.style] || btnClasses.primary;

                return (
                    <div key={i} className="my-6">
                        <a href={block.data.url || "#"} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition duration-200 ${styleClass}`}>
                            {block.data.text || "Button Text"} <ExternalLink size={16}/>
                        </a>
                    </div>
                )
              }

              return null;
           })}
        </div>
      </div>
    </article>
  );
};

export default BlogPreview;