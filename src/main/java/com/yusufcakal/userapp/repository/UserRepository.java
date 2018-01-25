package com.yusufcakal.userapp.repository;

import com.yusufcakal.userapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by rajeevkumarsingh on 27/06/17.
 */
public interface UserRepository extends JpaRepository<User, Long> {

}
