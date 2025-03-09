// import FileInput from "@/app/components/FileInput";

import FileInput from "@/components/FileInput";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {/* <FileInput /> */}
        <FileInput />
      </main>
    </div>
  );
}
