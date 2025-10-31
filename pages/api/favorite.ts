import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    try {
        const { currentUser } = await serverAuth(req, res);
        const { movieId } = req.body;

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if (!existingMovie) throw new Error('Invalid ID');
       

        if (req.method === 'POST'){
            
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    }
                }
            });
            console.log("updated-- ", user);
            
            return res.status(200).json(user);
        }

        if (req.method === 'DELETE') {

            console.log("evet işte delete req ", req);
            console.log("evet işte delete res ", res);
            
            const updateFavoriteIds = without(currentUser.favoriteIds, movieId);
            console.log("evet işte delete updateFavoriteIds ", updateFavoriteIds);

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updateFavoriteIds,
                    
                }
            });

            return res.status(200).json(updatedUser);

        }

        return res.status(405).end();

    } catch (error) {
        console.log("error -> ", error);
        return res.status(400).end();
    }
}