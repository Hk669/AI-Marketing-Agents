# Revolutionizing Marketing Campaigns: A Multi-Agent Gen AI Approach to Personalized Content Creation.

## Overview

This project utilizes a multi-agent architecture powered by generative AI (Gen AI) to automate the creation of personalized marketing campaigns. It connects various AI agents, each with distinct roles such as data retrieval, analysis, code interpretation, and email content generation. By utilizing customer data from a SQLite database, the system generates highly targeted, dynamic email marketing campaigns. The agents work in collaboration, streamlining the entire marketing process—from data collection and analysis to content creation—providing real-time feedback and optimization for engagement and conversion.

https://github.com/user-attachments/assets/17cd03be-8e84-447d-991d-51d53d8f0220


### Key Features:
- **Multi-Agent Collaboration**: Different agents with specialized tasks collaborate to retrieve, analyze, and interpret customer data.
- **Personalized Email Content**: Automatically generate personalized and dynamic email content tailored to specific customer segments.
- **Database Integration**: Retrieves customer data from a SQLite database, ensuring that the campaigns are highly customized based on actual user behavior and preferences.
- **Data-Driven Decision Making**: The system segments users based on various engagement metrics (e.g., total spent, transaction frequency, loyalty program participation) to inform campaign strategies.
- **Real-Time Adaptation**: Campaigns are dynamically adjusted based on feedback, ensuring that emails are always optimized for conversion.
- **User-Friendly Interface**: An interactive chat interface built using `panel`, which allows users to trigger the AI pipeline for different customer segments.

## Architecture

The system consists of five primary agents, each responsible for a specific part of the pipeline:

1. **User Proxy Agent**: Acts as the main interface for human inputs and coordination between agents. It initiates communication and triggers the flow of information.
  
2. **Data Retriever Agent**: This agent fetches the customer data from the SQLite database based on a given user ID. It extracts detailed user behavior and engagement metrics to form the foundation for further analysis.

3. **Analyst Agent**: Specializes in segmenting the customer data into distinct audience groups. It analyzes customer behavior, such as spending patterns and communication preferences, and provides actionable insights for personalized marketing strategies.

4. **Code Interpreter Agent**: Handles any code execution or data processing required during the process, such as manipulating retrieved data or generating additional insights based on customer behavior.

5. **Email Agent**: Responsible for generating complete email content, personalized to each audience segment. The agent uses the insights from the analyst to craft targeted, engaging emails designed to boost user interaction and conversions.

## Workflow

1. **Data Retrieval**: The `Data Retriever` fetches data for a specific user ID from the SQLite database (`customer_netcore.db`). It retrieves detailed customer attributes such as `total_spent`, `transaction_frequency`, `loyalty_points_balance`, `preferred_payment_method`, etc.

2. **Analysis**: The `Analyst Agent` segments the customer base using metrics like spending habits, engagement rates, and loyalty program status. The segmentation is designed to offer actionable insights into how each group prefers to be engaged.

3. **Content Generation**: The `Email Agent` creates fully personalized, dynamic email content based on the segmentation analysis. It incorporates user-specific placeholders such as `[DISCOUNT]`, `[PRODUCT_NAME]`, and `[MSP]` to further tailor the message.

4. **Interaction and Feedback**: A chat interface built using `panel` allows human users to input tasks (e.g., generating marketing campaigns for specific user IDs). The user proxy agent coordinates the flow of information, ensuring that the agents work together seamlessly.

## Technologies Used

- **Python**: The entire pipeline is written in Python for its flexibility and support for machine learning and AI tools.
- **SQLite**: A lightweight relational database is used to store customer data and provide quick access to relevant information.
- **`autogen`**: A custom agent orchestration framework used to manage the lifecycle and communication of different AI agents.


## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Hk669/AI-Marketing-Agents.git
   cd AI-Marketing-Agents
   ```

2. **Install Dependencies**:
   Ensure you have Python 3.8+ installed, then run:
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup `.env` file**:
   Create a `.env` file in the project root and add the following environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Database Setup**:
   Ensure you have the `customer_netcore.db` SQLite database in the root directory. This database should contain customer data in a table named `customer_data`.

5. **Running the Application**:
   You can run the application locally by executing the following command:
   ```bash
   python agents.py
   ```

6. **Interaction**:
   Once the server is running, access the application via the local server URL (typically `http://localhost:8080`). You can input tasks such as user IDs, and the agents will collaboratively create a personalized marketing campaign.

## Future Enhancements

- **Real-Time Customer Interaction Feedback**: Enable real-time interaction tracking and feedback loops for even more dynamic campaign adjustments.
- **Multi-Channel Campaigns**: Expand beyond email to create personalized content for SMS, social media, and push notifications.
- **Advanced Analytics**: Implement machine learning algorithms for predictive customer behavior analysis.

## Conclusion

This project revolutionizes the process of creating personalized marketing campaigns by automating complex tasks with multiple AI agents. By leveraging real-time data retrieval, advanced segmentation analysis, and dynamic email generation, businesses can deliver highly targeted content, improving customer engagement and conversion rates.