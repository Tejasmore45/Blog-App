package com.example.blog_app.service;


import com.example.blog_app.dto.PostDTO;
import com.example.blog_app.dto.UserDTO;
import com.example.blog_app.model.Post;
import com.example.blog_app.model.Users;
import org.springframework.stereotype.Service;

@Service
public class DtoConversionService {

    public PostDTO convertToPostDTO(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setCreatedAt(post.getCreatedAt());
        postDTO.setUpdatedAt(post.getUpdatedAt());
        postDTO.setAuthor(convertToUserDTO(post.getAuthor()));
        return postDTO;
    }

    public UserDTO convertToUserDTO(Users user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        return userDTO;
    }
}
