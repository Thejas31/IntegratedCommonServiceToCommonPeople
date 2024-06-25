from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service as ChromeService
from chromedriver_py import binary_path  # This will get you the path variable
import time

def initialize_driver():
    try:
        # Initialize the Service object using chromedriver_py's binary_path
        service = ChromeService(executable_path=binary_path)
        # Initialize the WebDriver
        driver = webdriver.Chrome(service=service)
        return driver
    except Exception as e:
        print(f"Error initializing WebDriver: {e}")
        return None

def main():
    driver = initialize_driver()
    if driver is None:
        print("Failed to initialize WebDriver. Exiting program.")
        return
    
    try:
        # Open Google Maps
        driver.get('https://www.google.com/maps')
        # Wait for the page to load
        time.sleep(5)

        # Get user's current location
        try:
            # Click on the "Your location" button (replace with the actual selector)
            your_location_button = driver.find_element(By.XPATH, '//*[@id="widget-mylocation"]')
            your_location_button.click()
            # Wait for the location to be updated
            time.sleep(10)  # Increase wait time as geolocation can take longer
            # Extract the current location
            location_element = driver.find_element(By.XPATH, '//*[@id="searchboxinput"]')
            live_location = location_element.get_attribute('value')
            print(f"Live Location: {live_location}")
        except Exception as e:
            print(f"Error getting live location: {e}")

        # Prompt user to input the place type
        nearest_place_type = "Passport Seva Kendra"

        try:
            # Input the place type into the search box (replace with actual selector)
            search_box = driver.find_element(By.XPATH, '//*[@id="searchboxinput"]')
            search_box.clear()
            search_box.send_keys(nearest_place_type)
            search_box.send_keys(Keys.RETURN)
            
            # Wait for the search results to load
            time.sleep(5)
            
            # Scrape the nearest place (replace with actual selector)
            nearest_place_element = driver.find_element(By.XPATH, '(//*[@class="Nv2PK THOPZb CpccDe"])[1]//h3/span')
            nearest_place = nearest_place_element.text
            print(f"Nearest {nearest_place_type}: {nearest_place}")
        except Exception as e:
            print(f"Error finding nearest {nearest_place_type}: {e}")
        
        # Keep the program running
        input("Press Enter to exit and close the browser...")
    except Exception as e:
        print(f"An error occurred during the main execution: {e}")
    finally:
        # Close the WebDriver
        if driver:
            driver.quit()

if __name__ == "__main__":
    main()
