import { LoginForm } from "@/components/module/login/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      {/* Illustration section - full width on mobile, half width on larger screens */}
      <div className="flex flex-1 flex-col items-center justify-center bg-blue-50 p-6 md:p-8 lg:w-1/2">
        <div className="max-w-xs sm:max-w-sm md:max-w-md">
          <Image
            src="/images/admin-illustration.png"
            alt="Person working at desk"
            width={400}
            height={400}
            priority
            className="mx-auto h-auto w-full"
          />
        </div>
      </div>

      {/* Form section - full width on mobile, half width on larger screens */}
      <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
