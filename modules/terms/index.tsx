"use client";
import React from "react";
import Container from "@/components/shared/Container";
import { useLang } from "@/hooks/useLang";
import TermsAndConditionsAr from "./TermsAndConditionsAr";
import TermsAndConditionsEn from "./TermsAndConditionsEn";

function TermsAndConditions() {
  const { isRTL } = useLang();

  return (
    <Container className="pb-10 px-5 pt-32 max-w-[1000px] min-h-[100shv]">
      <div className=" bg-white shadow-[0px_0px_15px_5px_#eeeeee] rounded-lg p-4 sm:p-8">
        {isRTL ? <TermsAndConditionsAr /> : <TermsAndConditionsEn />}
      </div>
    </Container>
  );
}

export default TermsAndConditions;
