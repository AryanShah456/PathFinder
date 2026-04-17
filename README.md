#PATHFINDER
Student Internship and Job Shadowing Platform

#OVERVIEW

PathFinder is a web platform that connects students with parents and professionals from the same school community.
It helps students discover internship and job shadowing opportunities using trusted school networks.

Students can create profiles, apply for opportunities, and communicate with parents who offer placements.
Parents can list opportunities, review applications, and interact with students through messaging.

This project focuses on improving career exposure for students at an early stage.

#PROBLEM THIS PROJECT SOLVES

Many students struggle to find real world experience opportunities.
Cold emailing companies often fails.
Networking opportunities are limited at a young age.

PathFinder solves this by:

• Using school communities as trusted networks
• Allowing parents to share real internship opportunities
• Making applications simple and organized
• Providing messaging between students and parents

#CORE FEATURES

Authentication
• Secure login system using Firebase Authentication
• Role based access for students and parents
• Automatic redirect to correct dashboard

Student Dashboard
• View available internship opportunities
• Apply for internships
• Track submitted applications
• View application status

Parent Dashboard
• Create internship or job shadowing listings
• View student applications
• Accept or reject applicants
• Manage posted opportunities

Profile Setup
• User profile creation after first login
• Role selection (student or parent)
• Profile completion tracking

Messaging System
• Direct messaging between students and parents
• Communication inside the platform
• Helps coordinate internship details

Application Management
• Students submit internship applications
• Parents review candidate information
• Application records stored in database

#PROJECT STRUCTURE

index.html
Main entry point. Redirects users based on login and role.

login.html
Handles user authentication.

setup-profile.html
Used when a user logs in for the first time.

studentdashboard.html
Dashboard interface for student users.

parentdashboard.html
Dashboard interface for parent users.

apply.html
Allows students to apply for opportunities.

myapplication.html
Shows applications submitted by students.

messaging.html
Handles communication between users.

#TECHNOLOGIES USED

Frontend
• HTML
• CSS
• JavaScript

Backend Services
• Firebase Authentication
• Firebase Firestore Database

Other Tools
• Google Fonts
• Firebase SDK

#HOW IT WORKS

User logs in through the login page
Firebase verifies authentication
System checks if profile setup is complete
User is redirected based on role
• Students go to student dashboard
• Parents go to parent dashboard
Students apply to internships
Parents review applications
Users communicate through messaging

#INSTALLATION AND SETUP

To run this project locally:

Download or clone the repository
Open the project folder

Connect your own Firebase project
Update the Firebase configuration inside each HTML file:

Replace:
apiKey
authDomain
projectId

With your Firebase project values.

Enable Firebase services
Turn on:
• Authentication
• Firestore Database
Open login.html in your browser
You can also deploy using Firebase Hosting.

#FUTURE IMPROVEMENTS

• Add search filters for internships
• Add resume upload feature
• Add admin dashboard
• Improve UI design and animations
• Add notifications system
• Add internship recommendation system
• Create mobile responsive layout

#USE CASES

Students
• Discover internship opportunities
• Apply easily
• Gain early career experience

Parents
• Offer job shadowing opportunities
• Support student development
• Connect with school community

Schools
• Improve career readiness programs
• Track internship participation
• Build stronger community links

#PROJECT GOALS

This project aims to:

• Improve student career exposure
• Strengthen school community connections
• Provide real world learning opportunities
• Create a scalable internship platform

#AUTHOR

Name: Aryan Shah
Project: PathFinder
Focus Areas: Robotics, Mechanical Engineering, and Software Development
