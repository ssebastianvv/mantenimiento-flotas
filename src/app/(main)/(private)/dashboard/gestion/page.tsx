import { LoginTemplate } from "@/ui/template";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProjectsPageTemplate from "@/ui/template/projectTemplate/projectTemplate";
import { VehicleService } from "@/app/infraestructure/services/project.services";



interface IProps {
  searchParams: {
      page: string;
      size: string;
      name: string;
  };
}

export const generateMetadata = async ({ searchParams }: IProps) => {
  const page = searchParams.page ?? 1;

  return {
      title: `Projectos ${page}`,
      description: "Voluntariado",
  };
};

export default async function ProjectsPage({ searchParams }: IProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
      redirect("/login");
  }

  const service = new VehicleService();
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const size = searchParams.size ? parseInt(searchParams.size) : 4;
  const data = await service.find(page, size);

  
  return (
      <div>
          <ProjectsPageTemplate dataResponse={data}></ProjectsPageTemplate>
      </div>
  )
}