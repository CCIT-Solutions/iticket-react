import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useApi } from "@/hooks/useApi";
import { MultiSelect } from "@/components/ui/multi-select";
import { fetchSpecialities } from "@/lib/api/auth/fetchSpecialities";
import { useLang } from "@/hooks/useLang";
import Loading from "@/components/shared/Loading";
import ErrorMessage from "@/components/shared/ErrorMessage";
import RetryLoading from "@/components/shared/RetryLoading";

export type Specialty = {
  id: string;
  name: string;
  desc: string;
  logo: string;
  parent_id: string;
};

interface MultiSpecialitySelectProps {
  field: ControllerRenderProps<FieldValues, string>;
}

const MultiSpecialitySelect = ({ field }: MultiSpecialitySelectProps) => {
  const { lang, t } = useLang();
  const {
    data: specialties = [],
    isLoading,
    error,
    retry,
  } = useApi({
    queryKey: ["specialities"],
    queryFn: () => fetchSpecialities({ acceptLanguage: lang }),
  });

  if (isLoading) return <Loading showText size="sm"/>;

  if (error) return <ErrorMessage />;

  if (error && !isLoading) return <RetryLoading retry={retry} />;

  return (
    <MultiSelect
      options={specialties.map((item) => ({
        value: item.id,
        label: item.name,
      }))}
      onValueChange={field.onChange}
      placeholder={t("register.specialtyPlaceholder")}
      asChild
      className="cursor-pointer"
      texts={{
        noResult: t("common.noResult"),
        clear: t("common.clear"),
        close: t("common.close"),
        search: t("common.search"),
        selectAll: t("common.selectAll"),
      }}
    />
  );
};

export default MultiSpecialitySelect;
