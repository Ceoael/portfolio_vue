<template>
    <div class="project">
        <h3 class="project__title">{{ title }}</h3>
        <p class="project__description"><slot></slot></p>

        <div class="project__links">
            <router-link class="project__link" v-if="!outside" :to="to">
                Open<span class="material-icons"  :class="'project__icon'">open_in_browser</span></router-link>

            <a class="project__link" target="_blank" v-else :href="to">
                Open <span class="material-icons" :class="'project__icon'">open_in_new</span></a>

            <a class="project__link" target="_blank" :href="githubLink">
                GitHub <img class="project__gitHubImage" src="./../../../assets/GitHub-Mark-Light-32px.png"/></a>
        </div>

        <div class="device">
            <div class="device__inner">
                <div class="device__image-wrapper">
                    <img :class="['device__image', {'device__image--scrollable': scrollable}]" :src="projectImageMobile" alt="project image"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Project",
    props: {
        title: {
            type: String,
            required: true
        },
        outside: {
            type: Boolean,
            default: false
        },
        to: {
            type: String,
            required: false
        },
        githubLink: {
            type: String,
            required: true
        },
        projectImageMobile: {
            type: String,
            required: true
        },
        scrollable: {
            type: Boolean,
            required: false
        }
    }
}
</script>

<style scoped>
* {
    --horizontal: 240px;
    --vertical: calc((var(--horizontal) / 6.5) * 13);
    --innerBorderRadius: 30px;
}
.project {
    display: flex;
    flex-direction: column;
    padding:0;

    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #E7E7EB;

    margin-bottom: 48px;
}
.project__title {
    font-size: 24px;
    font-weight: lighter;
    margin-bottom: 24px;
}
.project__description{
    /* letter-spacing: 1px; */
    font-size: 16px;
    margin-bottom: 15px;

    /* text-align: justify;
    text-justify: inter-word; */
}
.project__links {
    display: flex;
    justify-content: space-between;
}
.project__link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;

    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    /* color: #E7E7EB; */
    color: #A09FB1;

    /* text-decoration: none; */
}
.project__gitHubImage {
    width: 22px;
    margin-left: 5px;
}
.project__icon {
    margin-left: 5px;

    font-size: 22px;
    overflow: hidden;
}

.device {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: var(--horizontal);
    height: var(--vertical); /* aspect ratio 13:6.5 iphoneX(devtools)*/
    margin-top: 30px;

    background-color: #aaa9ad;

    border-radius: 30px;
    box-shadow:  inset 0 0 10px 2px black;

    padding: 2px;
}

.device__inner {
    width: 100%;
    height: 100%;
    background-color: black;
    box-shadow:  inset 0 0 5px 0 white;
    border-radius: var(--innerBorderRadius);

    padding: 15px;
}

.device__image-wrapper {
    position: relative;

    border-radius: 20px;
    overflow: hidden;

    width: 100%;
    height: 100%;
}

.device__image {
    width: 100%;
}

.device__image--scrollable {
    transition: 4s all ease-in-out;
}

.device__image--scrollable:hover {
    transform: translateY(calc(-100% + var(--vertical) - var(--innerBorderRadius)));
}
</style>
