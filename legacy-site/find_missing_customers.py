import json

# Customers from your list
customer_list = """
Chirag	chiragnr72@gmail.com
Sabarivasan mariyappan	Sabarivasanmariyappan805@gmail.com
Gourav Kumar pal	gauravkp73@gmail.com
Arshdeep Singh	arshbadwal5@gmail.com
GOPI KRISHNAN A. V. A	krishnanava62@gmail.com
SHYAMPREET   l	preetpal1951@gmail.com
Prashant	Khurana2983@gmail.com
Bhushan ms	msbhuvan07@gmail.com
Rajeev krishna	rajeevkrishna3456@gmail.com
Akshai D K	dkakshai28@gmail.com
Srinath K	srinathk3001@gmail.com
Keshav BG	keshavbg414@gmail.com
Md Badrealam Khan	22btcs001hy@manuu.edu.in
Taqdeer Kaur Grewal	
KARNAM.SAIRAM	sairamkarnam676@gmail.com
Gautam Mestry	Photos4gomzy@gmail.com
Anusha B	anushasureshb1303@gmail.com
MADUSUDHAN REDDY B M	
Anantha Reddy	chinnarappagariananth303@gmail.com
Pranavesh.R	rameshpranavesh@gmail.com
Abhishek	abhishekjena407@gmail.com
Shivani	shivanikhandelwal487@gmail.com
Sneha. P	
Vedant Chomal	vedantchomal@gmail.com
Bharathi Hiranmayee Brundavanam	bbhiranmayeeandhrauniversity.edu.in
Amritha M	amrithamanjunair@outlook.com
Nathan Aaron	meetnathanonline@gmail.com
Dhananjaya Naik	dhananjaya.bl@gmail.com
Agamya Kulkarni	agamyakulkarni7@gmail.com
Ravish Raizada	ravishlawrence@gmail.com
Abhishek	abhikatkar12@gmail.com
Pavan Kumar	pavanrochester@gmail.com
Hitansh Makhija	ritikacmakhija@gmail.com
Vidhya Sagar	gattusagar04997@gmail.com
Abhinav	abhinavjoshi7891@gmail.com
Vaishali Hanamant Bellubbi	bellubbivaishali@gmail.com
Ganesh	ganesh.sahai2@gmail.com
Jaseel A V	jaseel9544196709@gmail.com
Pravin	pravingreat7@outlook.in
Nandan L	nandan23lakshminarayan@gmail.com
Ashwin	ashwin280208@gmail.com
Ram Ashish Shrivastava	ram5march2018@gmail.com
Yadavalli Sneha	sriyasneha2@gmail.com
Adwaith kumar	adwaithkumar4506@gmail.com
Siddhi jadhav	jsiddhi961@gmail.com
Alvina Mary Thomas	alvinamary4710@gmail.com
Nirav patel	neerav84@gmail.com
Yogesh Bhat	yogeshnbhat@gmail.com
Pranjal Pradhan	pranjal.pradhan26@gmail.com
Titin Mondal	titinmondal30@gmail.com
BALAJI RAO	Balajirao1511@gmail.com
Deepakaradurai	deepakaradurai222456@gmail.com
Ruchik Chaudhari	ruchikchaudhari08@gmail.com
Rahul	rahulmani360@gmail.com
Roshan thavidisetti	tvnroshan@gmail.com
Arit bose	arit.bose27@gmail.com
SOM MISHRA	mishrasom75@email.com
Avyukt Gupta	avyuktgupta71@gmail.com
Tarsh Gaur	gaurtarsh47@gmail.com
Harikrishna Chaitanya	rohith2313smpl@gmail.com
Akash Sambare	akashsambare191@gmail.com
Vijayakumar P	pvijayakumara47@gmail.com
Ratan	rtnmali2025@gmail.com
Sneha. P	
PARISHA DOGRA	dograparisha87@gmail.com
Sai Jayanth	saijayanth2000y@gmail.com
Senthil	suma@emailad.com
sudhir	badgujar.sudhir1010@gmail.com
Smitha	smithsmitha766@gmail.com
Nikhil Ramdas Bhalerao	nikhilbhalerao86@gmail.com
Aleron	aleronandhiskeys@gmail.com
Kuber	sharmakuber011@gmail.com
Sanjana.p	sanjanapsanjana808@gmail.com
Siva	sivashankeran@gmail.com
Pavan Kumar	pavanrochester@gmail.com
Sunil Mardi	sunilmardi1000@gmail.com
"""

# Parse customer list
customer_emails = set()
customer_data = []
for line in customer_list.strip().split('\n'):
    parts = line.split('\t')
    if len(parts) >= 2:
        name = parts[0].strip()
        email = parts[-1].strip().lower()
        if email:  # Only add if email exists
            customer_emails.add(email)
            customer_data.append({'name': name, 'email': email})

# Load orders with tracking
with open('orders_with_tracking.json', 'r') as f:
    orders = json.load(f)

# Get emails from orders
order_emails = set()
for order in orders:
    email = order['customer_email'].lower()
    order_emails.add(email)

# Find missing customers (in your list but not in orders)
missing_customers = []
for customer in customer_data:
    if customer['email'] not in order_emails:
        missing_customers.append(customer)

# Print results
print("=" * 80)
print("MISSING CUSTOMERS (In your list but NOT in orders with tracking)")
print("=" * 80)
print(f"\nTotal customers in your list: {len(customer_emails)}")
print(f"Total orders with tracking: {len(order_emails)}")
print(f"Missing customers: {len(missing_customers)}\n")

if missing_customers:
    print("Missing Customer List:")
    print("-" * 80)
    for i, customer in enumerate(missing_customers, 1):
        print(f"{i}. {customer['name']:<40} {customer['email']}")
else:
    print("✅ All customers in your list have received tracking emails!")

print("\n" + "=" * 80)
