package com.example.blog_app.repository;

import com.example.blog_app.model.Post;
import com.example.blog_app.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // Custom query to find posts by the author (user)
    List<Post> findByAuthor(Users author);

    // Optionally, add more custom queries as needed
    List<Post> findByTitleContaining(String keyword);  // Example: Search posts by title
}
