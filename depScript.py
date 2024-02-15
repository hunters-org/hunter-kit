import os
import platform
import requests
import zipfile
import tarfile

def get_os_arch():
    system = platform.system().lower()
    machine = platform.machine().lower()

    if system == "linux":
        if machine == "x86_64":
            return "linux_amd64"
        elif machine == "x86":
            return "linux_386"
        elif machine.startswith("arm") or machine.startswith("aarch64"):
            return "linux_arm64"
    elif system == "darwin":
        if machine == "x86_64":
            return "macOS_amd64"
    elif system == "windows":
        if machine == "amd64":
            return "windows_amd64"
        elif machine == "x86":
            return "windows_386"

    print(f"Unsupported operating system: {system} {machine}")
    exit(1)

def download_and_extract(tool_info):
    tool_name = tool_info["name"]
    repo_owner = tool_info["repo_owner"]
    repo_name = tool_info["repo_name"]

    api_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/releases/latest"

    os_arch = get_os_arch()

    response = requests.get(api_url)

    if response.status_code == 200:
        release_info = response.json()

        asset_url = None
        for asset in release_info['assets']:
            asset_name_lower = asset['name'].lower()
            print(f"Available asset name: {asset_name_lower}")  # Print out the available asset names for debugging
            if os_arch in asset_name_lower:
                asset_url = asset['browser_download_url']
                break

        if asset_url:
            response = requests.get(asset_url, stream=True)
            archive_file_name = os.path.basename(asset_url)

            print(f"Downloading {tool_name}: {archive_file_name}")

            # Create 'bin' folder in the same directory as the script if it doesn't exist
            bin_folder = os.path.join(os.path.dirname(os.path.realpath(__file__)), "bin")
            if not os.path.exists(bin_folder):
                os.makedirs(bin_folder)

            file_path = os.path.join(bin_folder, archive_file_name)

            with open(file_path, "wb") as file:
                for chunk in response.iter_content(chunk_size=8192):
                    file.write(chunk)

            if archive_file_name.endswith(".zip"):
                extract_zip_archive(file_path, bin_folder)
            elif archive_file_name.endswith(".tar.gz") or archive_file_name.endswith(".tgz"):
                extract_tar_archive(file_path, bin_folder)
            else:
                print(f"Unsupported archive format: {archive_file_name}")
                exit(1)

            # Delete the archive file after extracting
            os.remove(file_path)

            print(f"{tool_name.capitalize()} downloaded and extracted: {archive_file_name}")
        else:
            print(f"No matching release asset found for {os_arch}")
    elif response.status_code == 404:
        print(f"Release information not found for {tool_name}. Check if the repository or release exists.")
    else:
        print(f"Failed to retrieve release information. Status code: {response.status_code}")

def extract_zip_archive(archive_file, extraction_path):
    with zipfile.ZipFile(archive_file, "r") as zip_ref:
        zip_ref.extractall(extraction_path)

def extract_tar_archive(archive_file, extraction_path):
    with tarfile.open(archive_file, "r:gz") as tar_ref:
        tar_ref.extractall(extraction_path)

if __name__ == "__main__":
    tools = [
        {"name": "subfinder", "repo_owner": "projectdiscovery", "repo_name": "subfinder"},
        # Add more tools as needed
    ]

    for tool_info in tools:
        download_and_extract(tool_info)
