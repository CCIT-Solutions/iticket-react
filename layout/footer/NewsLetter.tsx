"use client"
import Translate from "@/components/shared/Translate"
import { useLang } from "@/hooks/useLang"

function NewsLetter() {
    const {t} = useLang()
  return (
    <div className="flex flex-col gap-5 flex-wrap">
              <h3 className="font-semibold text-custom-grey-300">
                <Translate text="footer.newsletter.title" />
              </h3>
              <p className="text-neutral-800 text-sm w-full">
                <Translate text="footer.newsletter.desc" />
              </p>
              <div className="flex justify-between gap-4 ">
                <input
                  type="email"
                  className="px-2 py-3 text-sm bg-white rounded-lg grow-1 max-w-[195px] xs:max-w-auto"
                  placeholder={t("footer.newsletter.placeholder")}
                />
                <button className="bg-primary text-white px-6 py-3 md:py-3 rounded-lg hover:bg-neutral-700 transition-colors">
                  <Translate text="footer.newsletter.button" />
                </button>
              </div>
            </div>
  )
}
export default NewsLetter