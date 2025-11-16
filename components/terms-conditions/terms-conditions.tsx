"use client";

import termsData from "@/lib/data/terms-and-conditions.json";

interface Section {
  id: string;
  title: string;
  serial: string;
  content: string;
  subsections?: string[];
  note?: string;
}

export function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#f0f1f5ad]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="space-y-12 bg-white p-4 rounded-lg">
          {termsData.sections.map((section: Section) => (
            <div key={section.id} className="flex gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-8 font-medium rounded-lg bg-primary">
                  <span className="text-2xl">{section.serial}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {section.content}
                </p>

                {/* Subsections */}
                {section.subsections && (
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-gray-700">
                    {section.subsections.map(
                      (subsection: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">
                          {subsection}
                        </li>
                      )
                    )}
                  </ul>
                )}

                {/* Note */}
                {section.note && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                    <p className="text-sm text-blue-900 italic">
                      {section.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
