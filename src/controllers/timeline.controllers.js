import { postLikeDB, deleteLikeDB } from "../repositories/timeline.repository.js";


export async function postLike(req, res) {
  const { id } = req.params;
  const { like_owner_id } = req.body;
  try {
    await postLikeDB(id, like_owner_id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao adicionar o like");
  }
}

export async function deleteLike(req, res) {
  const { id } = req.params;
  const userId = res.locals.user.id;
  try {
    await deleteLikeDB(id, userId);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao retirar o like");
  }
}
