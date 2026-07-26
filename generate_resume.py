from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def split_text(text, max_chars):
    words = text.split()
    lines = []
    current_line = []
    current_length = 0
    for word in words:
        if current_length + len(word) + (1 if current_line else 0) <= max_chars:
            current_line.append(word)
            current_length += len(word) + (1 if current_line else 0)
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            current_length = len(word)
    if current_line:
        lines.append(" ".join(current_line))
    return lines

def create_resume(filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Margins and layout parameters
    left_margin = 40
    right_margin = width - 40
    content_width = right_margin - left_margin # 532 pt
    
    # Fonts and vertical pointer
    y = height - 40 # Start at 752

    # Helper function for drawing sections
    def draw_section_header(title):
        nonlocal y
        y -= 15
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(colors.HexColor("#0f172a")) # Slate-900
        c.drawString(left_margin, y, title)
        y -= 5
        c.setStrokeColor(colors.HexColor("#e2e8f0")) # Slate-200
        c.setLineWidth(0.8)
        c.line(left_margin, y, right_margin, y)
        y -= 12

    # --- HEADER SECTION ---
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(left_margin, y, "JAYANT REWATKAR")
    
    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor("#475569")) # Slate-600
    contact_info = "Pune, India  |  +91 9226723890  |  rewatkarjayant7@gmail.com  |  linkedin.com/in/jayant-rewatkar-72bb6a2a1  |  github.com/rewatkarjayant7-prog"
    y -= 15
    c.drawString(left_margin, y, contact_info)
    y -= 5

    # --- PROFESSIONAL SUMMARY ---
    draw_section_header("PROFESSIONAL SUMMARY")
    c.setFont("Helvetica", 9.5)
    c.setFillColor(colors.HexColor("#1e293b")) # Slate-800
    
    summary_text = (
        "MCA candidate targeting a Software Dev Engineer I role, with a strong foundation in data structures, "
        "algorithms, and software development across Python, Java, SQL, and REST API stacks. Completed 3 full-cycle "
        "software engineering projects spanning AI-enabled fintech, enterprise resource management, and social-impact "
        "platforms, each going from schema design to integration testing and deployment. Strong problem solving "
        "instincts, comfortable managing ambiguity, and focused on building things that have a direct impact on users."
    )
    
    summary_lines = split_text(summary_text, 112)
    for line in summary_lines:
        c.drawString(left_margin, y, line)
        y -= 12.5
    y -= 5

    # --- EDUCATION SECTION ---
    draw_section_header("EDUCATION")
    
    # Institution 1
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(left_margin, y, "G H Raisoni International Skill Tech University, Pune")
    c.setFont("Helvetica", 9.5)
    c.drawRightString(right_margin, y, "Sep 2024 – May 2026")
    y -= 12
    c.setFont("Helvetica-Oblique", 9.5)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(left_margin, y, "Master of Computer Applications (MCA)")
    y -= 16

    # Institution 2
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(left_margin, y, "GH Raisoni College of Engineering and Technology, Nagpur")
    c.setFont("Helvetica", 9.5)
    c.drawRightString(right_margin, y, "Jun 2021 – Apr 2024")
    y -= 12
    c.setFont("Helvetica-Oblique", 9.5)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(left_margin, y, "Bachelor of Computer Application (BCA)")
    y -= 8

    # --- TECHNICAL SKILLS SECTION ---
    draw_section_header("TECHNICAL SKILLS")
    c.setFont("Helvetica", 9)
    
    skills = [
        ("Core CS", "Data Structures, Algorithms, Object-Oriented Programming, System Design, CS fundamentals"),
        ("Languages", "Python, Java, C, C++, SQL"),
        ("Databases", "MySQL, MongoDB; SQL including JOINs, aggregations, indexing, query optimization, normalized schema design"),
        ("Frameworks", "Django, React.js, Bootstrap, REST APIs, HTML, CSS, JavaScript"),
        ("Machine Learning & AI", "scikit-learn, ML-driven classification, OCR (receipt parsing), Computer Vision fundamentals"),
        ("Practices & Tools", "Agile, Unit Testing, Integration Testing, Code Reviews, Git version control, Maven, VS Code, IntelliJ, PyCharm"),
        ("Soft Skills", "Problem Solving, Analytical Thinking, Managing Ambiguity, Attention to Detail, Team Collaboration")
    ]
    
    for category, items in skills:
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(colors.HexColor("#0f172a"))
        c.drawString(left_margin, y, category + ": ")
        cat_width = c.stringWidth(category + ": ", "Helvetica-Bold", 9)
        
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#334155"))
        
        # Splitting the items to wrap properly if too long
        max_item_chars = 110 - len(category)
        wrapped_items = split_text(items, max_item_chars)
        
        # Draw first line adjacent to category
        c.drawString(left_margin + cat_width, y, wrapped_items[0])
        y -= 11.5
        
        # Draw subsequent lines indented
        for i in range(1, len(wrapped_items)):
            c.drawString(left_margin + cat_width, y, wrapped_items[i])
            y -= 11.5
    y -= 4

    # --- PROJECTS SECTION ---
    draw_section_header("PROJECTS")
    
    # Project 1
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(left_margin, y, "Smart Budget Planner and Expense Tracker")
    c.setFont("Helvetica", 9.5)
    c.drawRightString(right_margin, y, "Jan 2025 – May 2025")
    y -= 12
    c.setFont("Helvetica-Oblique", 8.5)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(left_margin, y, "Python, Streamlit, MongoDB, scikit-learn, OCR, REST APIs")
    y -= 12
    
    p1_bullets = [
        "Built a 3-stage data pipeline (OCR receipt ingestion, scikit-learn classification, MongoDB storage) that turns receipt images into structured financial records with zero manual input, cutting core friction in personal budget tracking.",
        "Designed and implemented REST API endpoints with session-based authentication for income/expense CRUD operations, then ran integration tests across the Streamlit frontend and MongoDB backend to catch consistency bugs.",
        "Applied array-based aggregation and time-series grouping on stored transaction data to power real-time budget alert triggers and interactive spending trend dashboards, giving users immediate financial visibility."
    ]
    for bullet in p1_bullets:
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#0f172a"))
        c.drawString(left_margin + 10, y, "•")
        c.setFillColor(colors.HexColor("#334155"))
        wrapped_bullet = split_text(bullet, 102)
        for line in wrapped_bullet:
            c.drawString(left_margin + 20, y, line)
            y -= 11.5
    y -= 4

    # Project 2
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(left_margin, y, "Food Waste Management System")
    c.setFont("Helvetica", 9.5)
    c.drawRightString(right_margin, y, "Jun 2024 – Nov 2024")
    y -= 12
    c.setFont("Helvetica-Oblique", 8.5)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(left_margin, y, "Java, JSP, Servlets, JDBC, MySQL, HTML, CSS, Bootstrap, JavaScript, Maven, Chart.js")
    y -= 12
    
    p2_bullets = [
        "Owned end-to-end development of a Java EE web platform matching food donors to beneficiaries across donation listing, request, and live-tracking workflows, using location-aware matching to reduce coordination time.",
        "Designed a normalized five-table MySQL schema with foreign key constraints and B-tree indexed columns on high-frequency query fields, cutting dashboard query latency and keeping lifecycle records consistent.",
        "Wrote Maven-managed unit tests for the JDBC data-access layer covering all donation-matching and state-transition paths, and delivered a Chart.js admin dashboard to monitor activity and act on data directly."
    ]
    for bullet in p2_bullets:
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#0f172a"))
        c.drawString(left_margin + 10, y, "•")
        c.setFillColor(colors.HexColor("#334155"))
        wrapped_bullet = split_text(bullet, 102)
        for line in wrapped_bullet:
            c.drawString(left_margin + 20, y, line)
            y -= 11.5
    y -= 4

    # Project 3
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(left_margin, y, "Student Management System")
    c.setFont("Helvetica", 9.5)
    c.drawRightString(right_margin, y, "Jan 2024 – May 2024")
    y -= 12
    c.setFont("Helvetica-Oblique", 8.5)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(left_margin, y, "React.js, Django, Node.js, REST APIs, SQL, HTML, CSS, JavaScript, Git")
    y -= 12
    
    p3_bullets = [
        "Owned full delivery of a student records system for three user roles (Admin, Faculty, Student), building role-based authentication and access control across React.js frontend, Django REST API, and SQL backend.",
        "Designed 15+ REST API endpoints across four resource types, validated every endpoint with integration tests before frontend wiring, catching three logic bugs before they shipped.",
        "Found and fixed slow queries by applying multi-table JOIN optimization and column-level indexing across normalized tables, improving retrieval speed across all role views, and managed the full release cycle in Git."
    ]
    for bullet in p3_bullets:
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#0f172a"))
        c.drawString(left_margin + 10, y, "•")
        c.setFillColor(colors.HexColor("#334155"))
        wrapped_bullet = split_text(bullet, 102)
        for line in wrapped_bullet:
            c.drawString(left_margin + 20, y, line)
            y -= 11.5
    y -= 4

    # --- CERTIFICATIONS SECTION ---
    draw_section_header("CERTIFICATIONS")
    
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(left_margin, y, "Full Stack Java Developer (with AI & ML Exposure)")
    c.setFont("Helvetica", 9.5)
    c.drawRightString(right_margin, y, "2025")
    y -= 12
    c.setFont("Helvetica", 9.5)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(left_margin, y, "Seed Infotech Ltd., Pune")

    c.save()

if __name__ == "__main__":
    create_resume("Jayant_Rewatkar_Resume.pdf")
