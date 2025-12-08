#!/bin/bash

# Sitemap URL Tester - Bash/Curl Version
# Tests all URLs in sitemap for redirects and errors

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
SITEMAP_FILE="${1:-public/sitemap.xml}"
MAX_RETRIES=2
TIMEOUT=10

# Counters
TOTAL=0
SUCCESS=0
REDIRECTS=0
ERRORS=0

echo -e "${CYAN}Starting Sitemap URL Testing...${NC}\n"

# Check if sitemap exists
if [ ! -f "$SITEMAP_FILE" ]; then
    echo -e "${RED}[ERROR] Sitemap not found at $SITEMAP_FILE${NC}"
    echo -e "${YELLOW}Run 'node scripts/generate-sitemap.js' first to generate the sitemap.${NC}"
    exit 1
fi

# Extract URLs from sitemap
echo -e "${BLUE}Extracting URLs from sitemap...${NC}"
URLS=$(grep -oP '(?<=<loc>).*?(?=</loc>)' "$SITEMAP_FILE")
URL_COUNT=$(echo "$URLS" | wc -l)

echo -e "${GREEN}[OK] Found $URL_COUNT URLs in sitemap${NC}\n"

# Create results file
RESULTS_FILE="sitemap-test-results.txt"
echo "Sitemap URL Test Results - $(date)" > "$RESULTS_FILE"
echo "========================================" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

# Test each URL
echo -e "${CYAN}Testing URLs...${NC}\n"

while IFS= read -r url; do
    ((TOTAL++))
    
    # Show progress
    printf "[%3d/%3d] Testing: %-60s " "$TOTAL" "$URL_COUNT" "${url:0:60}"
    
    # Test URL with curl
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}|%{time_total}" \
                    --max-time "$TIMEOUT" \
                    --retry "$MAX_RETRIES" \
                    --retry-delay 1 \
                    -L \
                    "$url" 2>&1)
    
    # Parse response
    HTTP_CODE=$(echo "$RESPONSE" | cut -d'|' -f1)
    REDIRECT_URL=$(echo "$RESPONSE" | cut -d'|' -f2)
    TIME=$(echo "$RESPONSE" | cut -d'|' -f3)
    
    # Check status
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}[OK]${NC} (${TIME}s)"
        echo "[OK] $url - Status: $HTTP_CODE - Time: ${TIME}s" >> "$RESULTS_FILE"
        ((SUCCESS++))
    elif [[ "$HTTP_CODE" =~ ^3[0-9]{2}$ ]]; then
        echo -e "${YELLOW}[REDIRECT]${NC} ($HTTP_CODE -> $REDIRECT_URL)"
        echo "[REDIRECT] $url - Status: $HTTP_CODE - Redirects to: $REDIRECT_URL" >> "$RESULTS_FILE"
        ((REDIRECTS++))
    elif [ -z "$HTTP_CODE" ] || [ "$HTTP_CODE" = "000" ]; then
        echo -e "${RED}[ERROR]${NC} (Connection failed)"
        echo "[ERROR] $url - Status: ERROR - Connection failed" >> "$RESULTS_FILE"
        ((ERRORS++))
    else
        echo -e "${RED}[FAILED]${NC} ($HTTP_CODE)"
        echo "[FAILED] $url - Status: $HTTP_CODE" >> "$RESULTS_FILE"
        ((ERRORS++))
    fi
    
done <<< "$URLS"

# Generate report
echo ""
echo "========================================" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"
echo "SUMMARY:" >> "$RESULTS_FILE"
echo "Total URLs: $TOTAL" >> "$RESULTS_FILE"
echo "Successful: $SUCCESS" >> "$RESULTS_FILE"
echo "Redirects: $REDIRECTS" >> "$RESULTS_FILE"
echo "Errors: $ERRORS" >> "$RESULTS_FILE"

echo -e "\n${CYAN}========================================${NC}"
echo -e "${CYAN}SUMMARY${NC}"
echo -e "${CYAN}========================================${NC}"
echo -e "Total URLs tested:     $TOTAL"
echo -e "${GREEN}[OK] Successful (200 OK): $SUCCESS${NC}"
echo -e "${YELLOW}[WARN] Redirects:        $REDIRECTS${NC}"
echo -e "${RED}[ERROR] Errors:           $ERRORS${NC}"
echo -e "${CYAN}========================================${NC}\n"

echo -e "${GREEN}[OK] Results saved to: $RESULTS_FILE${NC}\n"

# Exit with appropriate code
if [ $REDIRECTS -gt 0 ] || [ $ERRORS -gt 0 ]; then
    echo -e "${RED}[FAILED] Tests failed: $ERRORS errors, $REDIRECTS redirects${NC}"
    exit 1
else
    echo -e "${GREEN}[SUCCESS] All tests passed successfully!${NC}"
    exit 0
fi
