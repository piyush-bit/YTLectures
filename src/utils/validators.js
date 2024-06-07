function isValidYouTubePlaylistId(playlistId) {
    /**
     * Check if the given playlist ID is a valid YouTube playlist ID.
     * 
     * A valid YouTube playlist ID is typically 34 characters long and 
     * consists of uppercase letters, lowercase letters, numbers, dashes, 
     * and underscores.
     * 
     * @param {string} playlistId - The playlist ID to validate.
     * @return {boolean} - True if the playlist ID is valid, False otherwise.
     */
    const pattern = /^[A-Za-z0-9_-]{34}$/;
    return pattern.test(playlistId);
}