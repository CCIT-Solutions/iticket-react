import { Speciality } from "@/types/speciality";
import { fetchJsonData } from "../api";

export const fetchSpecialities = ({
  acceptLanguage = "ar",
}: {
  acceptLanguage?: string;
}) =>
  fetchJsonData<Speciality[]>({
    endpoint: "client/specialities",
    acceptLanguage,
  });
