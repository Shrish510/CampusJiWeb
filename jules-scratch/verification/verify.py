from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify main page
        page.goto("http://localhost:8000")
        expect(page.locator("#header-container")).not_to_be_empty()
        page.screenshot(path="jules-scratch/verification/main_page_header.png")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        expect(page.locator("#footer-container")).not_to_be_empty()
        page.screenshot(path="jules-scratch/verification/main_page_footer.png")

        # Verify a page in a subdirectory
        page.goto("http://localhost:8000/about-us/")
        expect(page.locator("#header-container")).not_to_be_empty()
        page.screenshot(path="jules-scratch/verification/about_us_page_header.png")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        expect(page.locator("#footer-container")).not_to_be_empty()
        page.screenshot(path="jules-scratch/verification/about_us_page_footer.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
