import { useRouter } from "next/router"

//teste
export default function States() {
   const router = useRouter();

   return (
       <h1>{router.query.slug}</h1>
   )
}