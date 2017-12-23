const fetch = require('node-fetch')
const API = 'http://api.viewers-guide.hbo.com/service/'

const {
    stripHTMLTags
} = require('./util')

/** 
 * Get all seasons or a single season
 * @param {Number} id ID to find a season
 */
const getSeasons = async (id) => {
    const url = `${API}seasons?lang=1`
    try {
        const res = await fetch(url)
        const data = await res.json()

        if (!id) {
            return data.seasons
        }
        const season = data.seasons.find(s => s.id === id)
        if (!season) {
            return null
        }
        return season
    } catch (error) {
        console.error('Error fetching seasons', error)
    }
    return null
}

/**
 * Get featured charaters of an episode
 * @param {Number} episodeId ID of Episode
 */
const getFeaturedCharacters = async (episodeId) => {
    const url = `${API}episodeHome?episode_id=${episodeId}&lang=1`
    try {
        const res = await fetch(url)
        const data = await res.json()
        let result
        const sections = data.sections
        const len = sections.length
        for(let i = 0; i < len; i++) {
            const section = sections[i]
            if (section.name && section.name.length && section.name === 'people') {
                result = section.data.people.map(p => ({
                    id: p.id,
                    firstname: p.firstname,
                    lastname: p.lastname,
                    takeover: stripHTMLTags(p.takeover.body),
                    img: p.img ? p.img : p.takeover.img
                }))
                return result
            }
        }
    } catch (error) {
        console.error('Error at fetching Featured characters ', error)
        return null
    }
}

/**
 * Get Character information
 * @param {Number} id ID of Character
 */
const getCharacter = async (id) => {
    try {
        const url = `${API}characterDetails?id=${id}&lang=1`;
        const res = await fetch(url)
        const data = await res.json()
        
        // remove unwanted data
        delete data.intro.grid
                
        const result = {
            firstname: data.firstname,
            lastname: data.lastname,
            intro: data.intro,
            bio: stripHTMLTags(data.bio.body),
            img: data.bio.img,
            houses: data.houses.houses
        }
        return result
    } catch (error) {
        console.error('Error occurred at fetching character details', error)
        return null
    }
}

/**
 * Get Characters list
 */
const getCharactersList = async () => {
    try {
        const url = `${API}charactersList?lang=1`
        const res = await fetch(url)
        const data = res.json()
        return data
    } catch (error) {
        console.error('Error at fetching character list', error)
        return null
    }
}

exports.getSeasons = getSeasons
exports.getFeaturedCharacters = getFeaturedCharacters
exports.getCharacter = getCharacter
exports.getCharactersList = getCharactersList
