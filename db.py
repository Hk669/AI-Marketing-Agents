import sqlite3

# Connect to SQLite database (creates a file called `local_data.db` if it doesn't exist)
conn = sqlite3.connect('customer_netcore.db')
cursor = conn.cursor()

# Create table
def create_table():
    create_table_query = """
    CREATE TABLE IF NOT EXISTS customer_data (
        user_id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        gender TEXT,
        age INTEGER,
        location TEXT,
        account_creation_date TEXT,
        last_login_date TEXT,
        total_spent REAL,
        transaction_frequency INTEGER,
        average_transaction_value REAL,
        last_transaction_date TEXT,
        number_of_transactions INTEGER,
        favorite_payment_method TEXT,
        purchase_channel TEXT,
        preferred_device TEXT,
        preferred_language TEXT,
        time_on_site INTEGER,
        page_views_per_session INTEGER,
        average_cart_value REAL,
        abandoned_cart_count INTEGER,
        product_browsing_history TEXT,
        loyalty_program_member BOOLEAN,
        loyalty_points_balance INTEGER,
        email_open_rate REAL,
        email_click_rate REAL,
        SMS_opt_in BOOLEAN,
        SMS_click_rate REAL,
        best_time_in_the_day TEXT,
        best_day_in_a_week TEXT,
        best_week_in_a_month INTEGER,
        coupon_usage_frequency REAL,
        social_media_engagement REAL,
        number_of_reviews_written INTEGER,
        average_review_rating REAL,
        referral_count INTEGER,
        customer_service_interactions INTEGER,
        live_chat_use_frequency INTEGER,
        marketing_segment TEXT,
        campaign_engagement_score INTEGER,
        preferred_communication_channel TEXT,
        click_through_rate REAL,
        conversion_rate REAL,
        discount_usage_rate REAL,
        preferred_brand TEXT,
        brand_loyalty_index INTEGER,
        lifetime_value_estimate REAL,
        frequency_of_visits_per_week INTEGER,
        returning_customer BOOLEAN,
        shopping_basket_value REAL,
        cart_conversion_rate REAL,
        purchase_value_category TEXT,
        transaction_frequency_category TEXT,
        product_affinity TEXT,
        discount_affinity INTEGER
    );
    """
    cursor.execute(create_table_query)
    conn.commit()
    print('Table created successfully')

def push_data(data):
    insert_query = """
    INSERT OR IGNORE INTO customer_data VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    cursor.executemany(insert_query, data)
    conn.commit()
    print('Data inserted successfully')

def retrieve_user_data(user_id):
    cursor.execute("SELECT * FROM customer_data WHERE user_id = ?", (user_id,))
    user_data = cursor.fetchone()
    if user_data:
        columns = [col[0] for col in cursor.description]
        user_data_dict = dict(zip(columns, user_data))
        return user_data_dict
    return None


if __name__ == '__main__':
    # Query the data
    # import pandas as pd
    # csv_file_path = 'user_attribures.csv'
    # df = pd.read_csv(csv_file_path)
    # data = df.values.tolist()
    # print(data[:2])
    # create_table()
    # push_data(data)

    user_data = retrieve_user_data(29216)
    print(user_data)
