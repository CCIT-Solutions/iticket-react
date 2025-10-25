
import React from "react";
import Translate from "@/components/shared/Translate";
import Container from "@/components/shared/Container";

const PrivacyPolicy: React.FC = () => {
  return (
    <Container className="pb-10 px-5 pt-40 max-w-[1000px]">
      <div className="flex flex-col gap-3 mb-6">
        <p className="text-xl font-semibold text-neutral-400">
          <Translate text="terms.privacy" />
        </p>
        <h1 className="text-4xl font-semibold  mb-2">
          <Translate text="terms.pleaseReadCarefully" />
        </h1>
      </div>

      <div className=" rounded-lg shadow-sm py-6 space-y-6">
        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            <Translate text="terms.introduction" />
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            <Translate text="terms.userObligations" />
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-400">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie.</li>
            <li>Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            <Translate text="terms.privacyPolicy" />
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            <Translate text="terms.termination" />
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>

        {/* Acceptance Checkbox */}
        {/* <div className="flex items-start mt-6">
          <div className="w-6 h-6 rounded-md shrink-0 border-2 me-3 mt-0.5 flex items-center justify-center cursor-pointer border-neutral-300 hover:border-neutral-400">
            <Check className="text-white size-3" />
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">
            <Translate text="terms.iAccept" />
            <Link href={"/"} className="font-semibold">
              <Translate text="terms.terms" />
            </Link>
            <Translate text="terms.and" />
            <Link href={"/"} className="font-semibold">
              <Translate text="terms.privacy" />
            </Link>
          </p>
        </div> */}
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
