# Pride Points
PridePoints was created by Sean Brooker, Le-Anne Bannan and Elisa Collings for the RMIT subject Satellite Positioning (GEOM2066) in Semester 2, 2024. The assignment brief was to explore the use of GNSS and Geospatial technologies in mobile device applications; gain basic (or additional) skills in the development of browser-based software applications and create a functioning GNSS Game that can be played by others. This repository hosts a demonstrator version of a GNSS game. PridePoints was designed to allow those who are part of or interested in Melbourne's queer community and history explore our urban environment while interacting with others through games, activities and walking tours. Players use a map to navigate the urban environment and arrive at icons that mark significant places. 'Queer Quests' randomly generate throughout gameplay which represent calculated routes between places in suburbs. Visiting places, completing activities, adding new markers with their own stories and completing quests all gain 'points' and are added to a user's personal game map, helping them to create their own cartographic history. It is our hope that through this game, the parties, protests and people that changed Melbourne into the inclusive city that it is today are recognised, appreciated and provide inspiration to continue this journey.

# Gameplay
## Activities
When the user is located within 10m of a queer place of importance, activities are able to be accessed in the pop-up and invite the user to start a multi-player game. For example, a user will be prompted to choose or write the first line of a haiku. This line of the poem is saved as an active game at the site. The game remains active until another player visits the site. If the second player chooses to engage with the activity, they will be asked to write the second line of the poem. The first player is then notified and asked to complete the haiku, regardless of location. Both players receive points for completing the activity, with the initiating player receiving more for initiating the activity. 

## Queer Quests
'Queer Quests' randomly generate for users as they are playing the game. If a user chooses to begin a quest, they must walk toward the route on the map and visit all points. Points are allocated for each site visited, any activities that they engage in and for completing the route.

# Geospatial datasets and computations
The datapoints are real locations of queer significance that have been catalogued by Queer-ways, the Australian Queer Archives and community contributions. The data points are available for download <a href="https://www.google.com.au/maps/d/viewer?mid=1fk0pM4upCuMEp9bCe7g4EllH9NCfWdN9&femb=1&ll=-37.832573479824525%2C144.9480372282166&z=12">here</a>. These points were then converted to GeoJSON to be used by PridePoints. The routes for QueerQuests are shortest paths between selected points in a suburb locality from <a href="https://data.melbourne.vic.gov.au/pages/home/"> City of Melbourne administrative boundary data </a>. This is calculated by the creators using <a href="https://pro.arcgis.com/en/pro-app/latest/help/data/tables/find-what-is-inside-a-polygon.htm">'point in polygon' computations </a> and the <a href = "https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/route-tutorial.htm">ArcGIS Network Analyst tools</a>. The routes were saved as a GeoJSON dataset and then imported into the game. A 10m buffer is used to calculate a user's distance from game points and to determine their ability to interact with the points. Users can create and store their own datasets by adding visited places to their own map or adding their own places of significance by clicking on a place during gameplay.

# Content warning
 We believe that Melbourne is for everyone, but that has not always been the case. Homosexuality was illegal in our city until 1982 and until then, queer folks were forced to live, meet and express themselves away from the public eye. This means that some of our locations are places of violence and discrimination. If you find this triggering, use the 'NSFW' button to filter out sexually explicit or upsetting content. Notice something we didn't catch? Press report to help us keep PridePoints safe for everyone.

# Acknowledgements
This project utilises <a href ="https://github.com/zjjdes/position-app">Desmond Zhang's repository 'positioning-app'</a> as a basic template and guide. The information and data used by PridePoints has been downloaded from Queer-ways and is a combination of information from the <a href="https://queerarchives.org.au/">Australian Queer Archives (AQuA)</a> and community contributions. Importantly, PridePoints is based on the stolen lands of the Wurundjeri Woi Wurrung people of the Kulin Nations. We pay respect to Traditional Owners, Elders and Knowledge Holders of all Indigenous nations and acknowledge the ongoing history of sexual and gender diversity represented within these cultures.

# PridePoints Creators 
Sean Brooker, Le-Anne Bannan and Elisa Collings
