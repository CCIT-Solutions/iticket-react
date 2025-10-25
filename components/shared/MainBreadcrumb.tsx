import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLang } from "@/hooks/useLang";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
interface BreadcrumbProps {
  page?: string;
  between?: {
    link: string;
    title: string;
  }[];
}

function MainBreadcrumb({ page, between = [] }: BreadcrumbProps) {
  const { t, isRTL } = useLang();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t("nav.home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {(between?.length > 0 || page) && (
          <BreadcrumbSeparator>
            {isRTL ? (
              <IoIosArrowBack className="w-4 h-4 text-muted-foreground" />
            ) : (
              <IoIosArrowForward className="w-4 h-4 text-muted-foreground" />
            )}
          </BreadcrumbSeparator>
        )}

        {between?.length > 0 &&
          between.map((item, index) => (
            <span
              key={item.link}
              className="inline-flex items-center gap-1.5"
            >
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.link}>{item.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

           
                <BreadcrumbSeparator>
                  {isRTL ? (
                    <IoIosArrowBack className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <IoIosArrowForward className="w-4 h-4 text-muted-foreground" />
                  )}
                </BreadcrumbSeparator>
             
            </span>
          ))}

        {page && (
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default MainBreadcrumb;
