"use client";

import Animate from "@/components/shared/Animate";
import Container from "@/components/shared/Container";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";
import { fadeD1 } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { useGetLandingCategories } from "@/services/landingCategories/query";

function QuickFilters() {
  const { lang } = useLang();
  const { data: landingCategories, isLoading } = useGetLandingCategories(lang);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Animate
      variants={fadeD1}
      viewOnce
      className="mb-8 overflow-x-auto scrollbar-hide"
    >
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {landingCategories?.map((cat) => {
            const words = cat.title?.trim().split(/\s+/) ?? [];
            const isTwoWords = words.length === 2;
            const displayTitle = isTwoWords ? words.join("\n") : cat.title;

            return (
              <Button
                key={cat?.id}
                className="group flex flex-col items-start justify-between gap-2 p-5 rounded-xl font-bold transition-colors hover:bg-primary duration-700 bg-neutral-900 text-white hover:text-black cursor-pointer min-h-28"
              >
                <p
                  className={cn(
                    "font-bold uppercase whitespace-pre-line",
                    isTwoWords
                      ? " text-[15px]"
                      : "max-w-[80%] break-words text-[15px]",
                    lang === "ar" ? "text-right" : "text-left"
                  )}
                >
                  {displayTitle}
                </p>

                <span className="block text-xs bg-primary text-black group-hover:bg-neutral-900 group-hover:text-white p-1 rounded-full min-w-9 transition-colors duration-700">
                  {cat.total}
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
