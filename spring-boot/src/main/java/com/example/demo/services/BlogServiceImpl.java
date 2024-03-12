package com.example.demo.services;

import com.example.demo.models.Blog;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    @Override
    public List<Blog> getBlogs() {
        return createListOfBlogs();
    }

    private List<Blog> createListOfBlogs() {
        List<Blog> blogs = new ArrayList<>();

        blogs.add(createBlog(
                "solo-levelling",
                "https://cdn.archonia.com/images/1-104028982-1-2-original1/solo-leveling-vol-02-gn-manga.jpg",
                "Solo Levelling",
                "SIU",
                "Fantasy",
                "",
                "6 hours ago"
        ));

        blogs.add(createBlog(
                "tower-of-god",
                "https://wallpapercave.com/wp/wp5556303.jpg",
                "Tower Of God",
                "SIU",
                "Fantasy",
                "",
                "6 hours ago"
        ));

        blogs.add(createBlog(
                "leveling-up-with-the-gods",
                "https://lumitoon.com/wp-content/uploads/2021/07/COVER-LWG-copy.png",
                "Leveling Up with the Gods",
                "Oh Hyoen",
                "Fantasy",
                "",
                "6 hours ago"
        ));

        blogs.add(createBlog(
                "wind-breaker",
                "https://lumitoon.com/wp-content/uploads/2021/08/image.jpeg",
                "Wind Breaker",
                "Jo Yongseuk",
                "School Life",
                "",
                "6 hours ago"
        ));

        blogs.add(createBlog(
                "mercenary-enrollment",
                "https://lumitoon.com/wp-content/uploads/2022/02/690x100_cover.jpg",
                "Mercenary Enrollment",
                "YC",
                "School Life",
                "Yu Ijin was the sole survivor of a plane crash when he was little. After becoming a mercenary to survive for 10 years, he returns to his family in his hometown.",
                "6 hours ago"
        ));

        blogs.add(createBlog(
                "the-beginning-after-the-end",
                "https://www.mangaread.org/wp-content/uploads/2019/12/Pixaloop_10_10_2021_00_00_20_1080000-1.gif",
                "The Beginning After the End",
                "TurtleMe",
                "School Life",
                "King Grey has unsurpassed strength, wealth and authority in a world where military abilities rule. However, loneliness remains with those who have great power. Under the glamorous appearance of a powerful king, there is a shell of a man, devoid of purpose and will.\n" +
                        "\n" +
                        "Reincarnated in a new world filled with magic and monsters, the king gets a second chance to live his life anew. However, correcting the mistakes of the past will not be his only task. Under the peace and prosperity of the new world, there is a hidden current that threatens to destroy everything for which he worked, questioning his role and the reason for being born again.",
                "6 hours ago"
        ));


        return blogs;
    }

    private Blog createBlog(String alias, String image, String title, String author, String genre, String description, String timeAgo) {
        Blog blog = new Blog(alias, image, title, author, genre, description, timeAgo);
        blog.setAlias(alias);
        blog.setImage(image);
        blog.setTitle(title);
        blog.setAuthor(author);
        blog.setGenre(genre);
        blog.setDescription(description);
        blog.setTimeAgo(timeAgo);
        return blog;
    }
}