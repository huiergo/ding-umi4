import { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "@/utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  let prisma: PrismaClient;
  switch (req.method) {
    case 'GET':
      prisma = new PrismaClient();
      const allPosts = await prisma.post.findMany({ include: { author: true } });
      res.status(200).json(allPosts);
      await prisma.$disconnect()
      break;

    case 'POST':
      if (!req.cookies?.token) {
        return res.status(401).json({
          message: 'Unauthorized'
        })
      }
      console.log(11)
      const authorId = (await verifyToken(req.cookies.token)).id;
      console.log(22,authorId)
      prisma = new PrismaClient();
      let newPost={}
      if(req.body.keyword){
        console.log('[req.body---]请求的入参',req.body)
        newPost = await prisma.post.findMany({
          where: { 
            title: {
              contains: req.body.keyword,
            } 
        },
          include: { author: true }
        });

      }else{
        newPost =req.body.keyword&& await prisma.post.create({
          data: {
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date(),
            authorId,
            tags: req.body.tags.join(','),
            imageUrl: req.body.imageUrl
          }
        })
      }
       
      res.status(200).json(newPost);
      await prisma.$disconnect()
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}
