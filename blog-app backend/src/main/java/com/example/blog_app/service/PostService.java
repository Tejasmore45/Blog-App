// src/main/java/com/example/blog_app/service/PostService.java
package com.example.blog_app.service;

import com.example.blog_app.dto.PostDTO;
import com.example.blog_app.model.Post;
import com.example.blog_app.model.Users;
import com.example.blog_app.repository.PostRepository;
import com.example.blog_app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepo usersRepository;

    @Autowired
    private DtoConversionService dtoConversionService;

    public PostDTO createPost(Post post) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Users author = usersRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        post.setCreatedAt(LocalDateTime.now());
        post.setAuthor(author);

        Post savedPost = postRepository.save(post);
        return dtoConversionService.convertToPostDTO(savedPost);
    }

    public List<PostDTO> getPostsByCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Users author = usersRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return postRepository.findByAuthor(author)
                .stream()
                .map(dtoConversionService::convertToPostDTO)
                .collect(Collectors.toList());
    }

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(dtoConversionService::convertToPostDTO)
                .collect(Collectors.toList());
    }

    public PostDTO getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return dtoConversionService.convertToPostDTO(post);
    }

    public PostDTO updatePost(Long postId, Post updatedPost) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());
        post.setUpdatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        return dtoConversionService.convertToPostDTO(savedPost);
    }

    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}
