import Image from "next/image";
import logoLight from "../../public/logo-light.png";
import leftSide from "../../public/left-side.png";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AuthForm from "./AuthForm";

export default async function Home() {
  const session = await auth();
  if (!(!session || !session.user)) {
    redirect("/dashboard/upload");
  }

  return (
    <main className="w-vw flex h-full flex-row flex-nowrap">
      <section
        style={{
          backgroundImage: `url(${leftSide.src})`,
        }}
        className="hidden h-screen w-1/2 flex-col flex-nowrap justify-between bg-cover bg-center lg:flex"
      >
        <div className="p-5">
          <Image
            src={logoLight}
            alt="BASE company logo"
            width={65}
            height={65}
          />
        </div>
        <h1 className="text-center text-6xl font-bold text-white md:pe-10 lg:pe-20">
          BASE
        </h1>
        <div className="flex w-full  justify-center gap-7 py-10 text-4xl text-white md:pe-10 lg:pe-20">
          <Link href="https://twitter.com/openinapp">
            <AiFillTwitterCircle />
          </Link>
          <Link href="https://github.com/SwapnilRaj1708">
            <FaGithub />
          </Link>
          <Link href="https://www.linkedin.com/company/openinapp/">
            <FaLinkedin />
          </Link>
          <Link href="https://discord.com">
            <IoLogoDiscord />
          </Link>
        </div>
      </section>
      <section className="flex h-screen w-full flex-col flex-nowrap justify-center lg:w-1/2 lg:p-0 lg:pe-[5rem] ">
        <div className="fixed top-0 flex h-[5rem] w-full flex-row items-center justify-start gap-[11px] bg-[var(--accent-color)] ps-[20px] text-[25px] font-semibold text-white lg:hidden">
          <Image
            src={logoLight}
            alt="BASE company logo"
            width={26}
            height={26}
          />
          Base
        </div>
        <AuthForm />
        <div className="mt-[40px] flex w-full justify-center gap-7 pb-[20px] text-4xl text-[var(--secondary-color)] lg:hidden">
          <Link href="https://twitter.com/openinapp">
            <AiFillTwitterCircle />
          </Link>
          <Link href="https://github.com/SwapnilRaj1708">
            <FaGithub />
          </Link>
          <Link href="https://www.linkedin.com/company/openinapp/">
            <FaLinkedin />
          </Link>
          <Link href="https://discord.com">
            <IoLogoDiscord />
          </Link>
        </div>
      </section>
    </main>
  );
}
