package com.healthcare.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthcare.controller.AuthController.SignupRequest;
import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static class DuplicateGroup {
        private String _id;
        private int count;
        private List<String> ids;

        public DuplicateGroup() {}

        public String get_id() { return _id; }
        public void set_id(String _id) { this._id = _id; }
        public int getCount() { return count; }
        public void setCount(int count) { this.count = count; }
        public List<String> getIds() { return ids; }
        public void setIds(List<String> ids) { this.ids = ids; }
    }

    public User registerUser(String email, String password, String userType, String fullName) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(email, hashedPassword, userType, fullName);
        return userRepository.save(user);
    }

    public Map<String, List<User>> findDuplicateUsersByEmailAndUserType() {
        List<User> allUsers = userRepository.findAll();
        Map<String, List<User>> grouped = allUsers.stream()
            .collect(Collectors.groupingBy(u -> u.getEmail() + "|" + u.getUserType()));
        return grouped.entrySet().stream()
            .filter(e -> e.getValue().size() > 1)
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public User registerUser(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        String hashedPassword = passwordEncoder.encode(signupRequest.getPassword());
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setPasswordHash(hashedPassword);
        user.setUserType(signupRequest.getUserType());
        user.setFullName(signupRequest.getFullName());
        user.setPhone(signupRequest.getPhone());
        user.setDateOfBirth(signupRequest.getDateOfBirth());
        user.setGender(signupRequest.getGender());
        user.setAddress(signupRequest.getAddress());
        user.setCity(signupRequest.getCity());
        user.setState(signupRequest.getState());
        user.setZipCode(signupRequest.getZipCode());
        user.setBloodType(signupRequest.getBloodType());
        user.setAllergies(signupRequest.getAllergies());
        user.setMedicalConditions(signupRequest.getMedicalConditions());
        user.setCurrentMedications(signupRequest.getCurrentMedications());
        user.setEmergencyContactName(signupRequest.getEmergencyContactName());
        user.setEmergencyContactPhone(signupRequest.getEmergencyContactPhone());
        user.setEmergencyContactRelation(signupRequest.getEmergencyContactRelation());
        user.setPreferredHospital(signupRequest.getPreferredHospital());
        user.setInsuranceProvider(signupRequest.getInsuranceProvider());
        user.setInsurancePolicyNumber(signupRequest.getInsurancePolicyNumber());
        user.setLicenseNumber(signupRequest.getLicenseNumber());
        user.setSpecialization(signupRequest.getSpecialization());
        user.setMedicalDegree(signupRequest.getMedicalDegree());
        user.setYearsOfExperience(signupRequest.getYearsOfExperience());
        user.setHospitalAffiliation(signupRequest.getHospitalAffiliation());
        user.setAllowEmergencyServices(signupRequest.isAllowEmergencyServices());
        user.setAllowAIAnalysis(signupRequest.isAllowAIAnalysis());
        user.setAllowDataSharing(signupRequest.isAllowDataSharing());
        user.setEnableLocationServices(signupRequest.isEnableLocationServices());
        user.setCreatedAt(java.time.LocalDateTime.now());
        return userRepository.save(user);
    }

    public Optional<User> authenticateUser(String email, String password, String userType) {
        Optional<User> userOpt = userRepository.findByEmailAndUserType(email, userType);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPasswordHash())) {
            return userOpt;
        }
        return Optional.empty();
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    public User updateUser(String id, User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            // Update fields (excluding password and email for security)
            existingUser.setFullName(updatedUser.getFullName());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
            existingUser.setGender(updatedUser.getGender());
            existingUser.setAddress(updatedUser.getAddress());
            existingUser.setCity(updatedUser.getCity());
            existingUser.setState(updatedUser.getState());
            existingUser.setZipCode(updatedUser.getZipCode());
            existingUser.setBloodType(updatedUser.getBloodType());
            existingUser.setAllergies(updatedUser.getAllergies());
            existingUser.setMedicalConditions(updatedUser.getMedicalConditions());
            existingUser.setCurrentMedications(updatedUser.getCurrentMedications());
            existingUser.setEmergencyContactName(updatedUser.getEmergencyContactName());
            existingUser.setEmergencyContactPhone(updatedUser.getEmergencyContactPhone());
            existingUser.setEmergencyContactRelation(updatedUser.getEmergencyContactRelation());
            existingUser.setPreferredHospital(updatedUser.getPreferredHospital());
            existingUser.setInsuranceProvider(updatedUser.getInsuranceProvider());
            existingUser.setInsurancePolicyNumber(updatedUser.getInsurancePolicyNumber());
            existingUser.setAllowEmergencyServices(updatedUser.getAllowEmergencyServices());
            existingUser.setAllowAIAnalysis(updatedUser.getAllowAIAnalysis());
            existingUser.setAllowDataSharing(updatedUser.getAllowDataSharing());
            existingUser.setEnableLocationServices(updatedUser.getEnableLocationServices());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<String> findDuplicateUserIdsToDelete() {
        MatchOperation match = Aggregation.match(Criteria.where("email").exists(true).and("userType").exists(true));
        GroupOperation group = Aggregation.group("email", "userType")
            .count().as("count")
            .push("$_id").as("ids");
        Aggregation aggregation = Aggregation.newAggregation(match, group, Aggregation.match(Criteria.where("count").gt(1)));
        AggregationResults<DuplicateGroup> results = mongoTemplate.aggregate(aggregation, "users", DuplicateGroup.class);
        List<DuplicateGroup> groups = results.getMappedResults();
        return groups.stream()
            .flatMap(g -> g.getIds().stream().skip(1)) // Keep the first, delete the rest
            .collect(Collectors.toList());
    }

    public void deleteUsersByIds(List<String> ids) {
        userRepository.deleteAllById(ids);
    }
}
