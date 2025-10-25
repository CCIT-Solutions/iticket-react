"use client";

import Animate from "@/components/shared/Animate";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { quickFilters } from "@/data/quickFilters";
import { useLang } from "@/hooks/useLang";
import { fadeD1 } from "@/lib/animation";

function QuickFilters() {
  const { lang } = useLang();

  return (
    <Animate
      variants={fadeD1} className="mb-8 overflow-x-auto scrollbar-hide">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {quickFilters.map((filter, index) => {
            // Use the pre-split label object
            const label = filter.label[lang] || filter.label.en;

            return (
              <Button
                key={index}
                className="group flex flex-col items-start justify-start gap-2 p-5 rounded-xl font-bold transition-colors hover:bg-primary duration-700 bg-neutral-900 text-white hover:text-black cursor-pointer h-28"
              >
                <div className="flex flex-col items-start">

               
                <span
                  className="block tracking-widest"
                  style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                >
                  {label.first}
                
                </span>
                <span
                  className="block tracking-widest"
                  style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                >
                  {label.second}
                </span>
                 </div>
                <span className="block text-xs bg-primary text-black group-hover:bg-neutral-900 group-hover:text-white p-1 rounded-full min-w-9 transition-colors duration-700">
                  {filter.count}
                </span>
              </Button>
            );
          })}
        </div>
      </Container>
    </Animate>
  );
}

export default QuickFilters;
