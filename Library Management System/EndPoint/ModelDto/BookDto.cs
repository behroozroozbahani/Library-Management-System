namespace EndPoint.ModelDto
{
    public class BookDto /*: BaseDto*/
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int GenreId { get; set; }
        public int PublisherId { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
