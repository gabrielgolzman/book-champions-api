import { Book } from "../models/Book.js";

export const findBooks = async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
};

export const findBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id: id } });

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    res.json(book);
}

export const createBook = async (req, res) => {
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

    // Title and author are required
    if (!title || !author)
        return res.status(400).send({ message: "Title and author fields are required" });

    const newBook = await Book.create({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available
    })
    res.json(newBook)
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

    // Title and author are required
    if (!title || !author)
        return res.status(400).send("Title and author fields are required");

    // Find the book
    const book = await Book.findByPk(id);

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    // Update it
    await Book.update({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available
    },
        {
            where: {
                id
            }
        });

    res.json(book);

};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    await book.destroy();

    res.send(`Book with id: ${id} deleted`);
}