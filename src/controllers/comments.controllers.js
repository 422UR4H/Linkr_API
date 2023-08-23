import createCommentDB from "../repositories/comment.repository.js";

export async function createComment(req, res) {
    const { comment } = req.body;
    const { post_id } = req.params;
    const { id } = res.locals.user;

    try {
        const result = await createCommentDB(id, post_id, comment);
        if (result.rowCount === 0) return res.sendStatus(409);
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}