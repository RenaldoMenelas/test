// "use client";

 import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback } from "react";
// import { IconType } from "react-icons";
// import { IoDiamond } from "react-icons/io5";
// import { MdOutlineVilla, MdAddAPhoto } from "react-icons/md";
// import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
// import { ImBooks } from "react-icons/im";
// import { BsFillTicketPerforatedFill } from "react-icons/bs";

// type Category = {
//   label: string;
//   icon: IconType;
// };

// const categories: Category[] = [
//   {
//     label: "WorkSession",
//     icon: ImBooks,
//   },
//   {
//     label: "Studio's",
//     icon: MdAddAPhoto,
//   },
//   {
//     label: "Rehearsal",
//     icon: BsFillTicketPerforatedFill,
//   },
//   {
//     label: "Modern",
//     icon: MdOutlineVilla,
//   },
// ];

// function CategoryBox({ icon: Icon, label, selected }: { icon: IconType; label: string; selected?: boolean }) {
//   const router = useRouter();
//   const params = useSearchParams();

//   const handleClick = useCallback(() => {
//     const currentParams = params ? new URLSearchParams(params.toString()) : new URLSearchParams();

//     if (currentParams.get("category") === label) {
//       currentParams.delete("category");
//     } else {
//       currentParams.set("category", label);
//     }

//     const updatedUrl = `${window.location.pathname}?${currentParams.toString()}`;
//     router.push(updatedUrl);
//   }, [label, params, router]);

//   return (
//     <div
//       onClick={handleClick}
//       className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
//         selected ? "border-b-neutral-800" : "border-transparent"
//       } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
//     >
//       <Icon size={26} />
//       <div className="font-medium text-xs">{label}</div>
//     </div>
//   );
// }

// export default function Categories() {
//   const params = useSearchParams();
//   const selectedCategory = params ? params.get("category") : null;

//   return (
//     <div className="h-full w-40 bg-white shadow-lg pt-20 ">
//       <div className="flex flex-col items-start justify-start overflow-y-auto h-full space-y-4 p-4">
//         {categories.map((category, index) => (
//           <CategoryBox
//             key={index}
//             icon={category.icon}
//             label={category.label}
//             selected={selectedCategory === category.label}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
export {};