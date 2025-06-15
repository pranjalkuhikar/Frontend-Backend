# Function to make API requests
function Test-Endpoint {
    param (
        [string]$Method,
        [string]$Endpoint,
        [string]$Body = "",
        [hashtable]$Headers = @{}
    )
    
    try {
        $uri = "http://localhost:8080$Endpoint"
        Write-Host "`nTesting $Method $Endpoint..."
        
        if ($Body) {
            $response = Invoke-RestMethod -Uri $uri -Method $Method -Body $Body -ContentType "application/json" -Headers $Headers
        } else {
            $response = Invoke-RestMethod -Uri $uri -Method $Method -Headers $Headers
        }
        
        Write-Host "Response: $($response | ConvertTo-Json)"
        return $response
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            $responseBody = $_.ErrorDetails.Message
            Write-Host "Response: $responseBody"
        }
    }
}

# Test 1: Health Check
Write-Host "`n=== Testing Health Check ==="
Test-Endpoint -Method "GET" -Endpoint "/api/v1/health"

# Test 2: User Registration
Write-Host "`n=== Testing User Registration ==="
$registerBody = @{
    username = "testuser"
    email = "test@example.com"
    password = "Test123!"
} | ConvertTo-Json
Test-Endpoint -Method "POST" -Endpoint "/api/v1/user/register" -Body $registerBody

# Test 3: User Login
Write-Host "`n=== Testing User Login ==="
$loginBody = @{
    email = "test@example.com"
    password = "Test123!"
} | ConvertTo-Json
$loginResponse = Test-Endpoint -Method "POST" -Endpoint "/api/v1/user/login" -Body $loginBody

# Extract token from login response
$token = ""
if ($loginResponse) {
    try {
        $token = $loginResponse.token
        Write-Host "Successfully obtained token"
    }
    catch {
        Write-Host "Failed to extract token from login response"
    }
}

# Test 4: Authentication Check
if ($token) {
    Write-Host "`n=== Testing Authentication ==="
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    Test-Endpoint -Method "GET" -Endpoint "/api/v1/user/auth" -Headers $headers
}

# Test 5: Invalid Login Attempt
Write-Host "`n=== Testing Invalid Login ==="
$invalidLoginBody = @{
    email = "test@example.com"
    password = "WrongPassword123!"
} | ConvertTo-Json
Test-Endpoint -Method "POST" -Endpoint "/api/v1/user/login" -Body $invalidLoginBody

# Test 6: Invalid Registration (Missing Fields)
Write-Host "`n=== Testing Invalid Registration (Missing Fields) ==="
$invalidRegisterBody = @{
    username = "testuser2"
    # email missing
    password = "Test123!"
} | ConvertTo-Json
Test-Endpoint -Method "POST" -Endpoint "/api/v1/user/register" -Body $invalidRegisterBody

# Test 7: Invalid Authentication (No Token)
Write-Host "`n=== Testing Invalid Authentication (No Token) ==="
Test-Endpoint -Method "GET" -Endpoint "/api/v1/user/auth"

# Test 8: Invalid Authentication (Invalid Token)
Write-Host "`n=== Testing Invalid Authentication (Invalid Token) ==="
$invalidHeaders = @{
    "Authorization" = "Bearer invalid.token.here"
}
Test-Endpoint -Method "GET" -Endpoint "/api/v1/user/auth" -Headers $invalidHeaders 