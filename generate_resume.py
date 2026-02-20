from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def create_resume(filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Fonts
    c.setFont("Helvetica-Bold", 24)
    
    # Header
    y_position = height - 50
    c.drawString(50, y_position, "JAYANT REWATKAR")
    
    c.setFont("Helvetica", 12)
    y_position -= 20
    c.drawString(50, y_position, "Pune, India | +91 9226723890 | rewatkarjayant7@gmail.com")
    
    c.setLineWidth(1)
    y_position -= 10
    c.line(50, y_position, width - 50, y_position)
    
    # Professional Summary
    y_position -= 30
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_position, "PROFESSIONAL SUMMARY")
    
    c.setFont("Helvetica", 10)
    y_position -= 15
    summary = [
        "Highly motivated MCA student (Second Year) with strong fundamentals in software development,",
        "data structures, and web technologies. Hands-on experience in Python, Java, SQL, and full-stack",
        "web development, with exposure to machine learning and computer vision. Proven ability to design,",
        "develop, and optimize real-world applications. Passionate about solving real problems and writing",
        "clean code. Actively seeking Software Engineering / Full-Stack / Python Developer internships."
    ]
    for line in summary:
        c.drawString(50, y_position, line)
        y_position -= 12

    # Education
    y_position -= 20
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_position, "EDUCATION")
    
    c.setFont("Helvetica-Bold", 11)
    y_position -= 20
    c.drawString(50, y_position, "G H Raisoni International Skill Tech University, Pune")
    c.setFont("Helvetica", 11)
    c.drawString(400, y_position, "September 2024 - May 2026")
    y_position -= 15
    c.setFont("Helvetica-Oblique", 11)
    c.drawString(50, y_position, "Master of Computer Applications (MCA)")
    
    y_position -= 20
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, y_position, "GH Raisoni College of Engineering and Technology, Nagpur")
    c.setFont("Helvetica", 11)
    c.drawString(400, y_position, "June 2021 - April 2024")
    y_position -= 15
    c.setFont("Helvetica-Oblique", 11)
    c.drawString(50, y_position, "Bachelor of Computer Application (BCA)")

    # Skills
    y_position -= 30
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_position, "TECHNICAL SKILLS")
    
    y_position -= 15
    c.setFont("Helvetica", 10)
    skills = [
        "Languages: Python, Java, C, C++, SQL",
        "Frameworks: Django, Bootstrap, React.js",
        "Web Technologies: HTML, CSS, JavaScript",
        "Tools & IDEs: VS Code, IntelliJ, PyCharm, Git, Anaconda",
        "Soft Skills: Problem Solving, Analytical Thinking, Team Collaboration"
    ]
    for skill in skills:
        c.drawString(65, y_position, "• " + skill)
        y_position -= 15

    # Projects
    y_position -= 20
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_position, "PROJECTS")
    
    # Project 1
    y_position -= 20
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, y_position, "Smart Budget Planner and Expense Tracker")
    y_position -= 15
    c.setFont("Helvetica", 10)
    p1_details = [
        "AI-enabled web application for automated income, expense, and budget management.",
        "Implemented secure authentication and REST APIs with MongoDB.",
        "Integrated OCR-based receipt scanning and ML-driven expense categorization.",
        "Tech Stack: Python, Streamlit, MongoDB, ML, OCR, REST APIs"
    ]
    for line in p1_details:
        c.drawString(65, y_position, "• " + line)
        y_position -= 12
        
    # Project 2
    y_position -= 10
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, y_position, "Weapon Detection Using Computer Vision")
    y_position -= 15
    c.setFont("Helvetica", 10)
    p2_details = [
        "Real-time weapon detection system using deep learning from CCTV or live video.",
        "Trained on custom datasets for high accuracy in low-light and occluded scenarios.",
        "Tech Stack: Deep Learning, PyTorch/TensorFlow, OpenCV, Python"
    ]
    for line in p2_details:
        c.drawString(65, y_position, "• " + line)
        y_position -= 12

    # Project 3
    y_position -= 10
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, y_position, "Student Management System")
    y_position -= 15
    c.setFont("Helvetica", 10)
    p3_details = [
        "Scalable full-stack web application for student records, courses, and attendance.",
        "Implemented role-based authentication (Admin, Faculty, Student).",
        "Optimized database queries for performance.",
        "Tech Stack: React.js, Django, Node.js, SQL, HTML, CSS, Git"
    ]
    for line in p3_details:
        c.drawString(65, y_position, "• " + line)
        y_position -= 12
        
    # Certifications
    y_position -= 20
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_position, "CERTIFICATIONS")
    
    y_position -= 15
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, y_position, "Full Stack Java Developer (with AI & ML Exposure)")
    c.setFont("Helvetica", 11)
    c.drawString(400, y_position, "Seed Infotech Ltd., Pune")

    c.save()

if __name__ == "__main__":
    create_resume("Jayant_Rewatkar_Resume.pdf")
