import React from "react";
import PageLayout from "../../components/layout/PageLayout";
import { BRANCHES } from "../../constants/branch";
import { useRouter } from "next/router";
import styles from "../../styles/pages/branch.module.scss";
import CustomDropdown from "../../components/branch/CustomDropdown";
import { FiChevronDown } from "react-icons/fi";
import NextEventCard from "../../components/common/NextEventCard/NextEventCard";
import Trending from "../../components/home/Trending";

const branchHeading = (branch: string) => {
    const branchList = Object.keys(BRANCHES);

    return (
        <div className={styles.headerText}>
            <span className={styles.sideText}>{">>"} On Branch</span>
            <span>
                <CustomDropdown 
                    icon={<FiChevronDown />}
                    currentBranch={branch}
                    branchList={branchList}
                />
            </span>
            <span className={styles.sideText}>, Nothing to commit.</span>
        </div>
    )
}

type Props = {
    branch: string;
    name: string;
    whoAreWe: string[];
    whatWeDo: string[];
    logoUrl: string;
    alias: string;
    subgroupColor?: string;
}

export default function Branch({ branch, name, whoAreWe, whatWeDo, logoUrl, alias, subgroupColor }: Props) {
    const router = useRouter();
    return (
        <PageLayout 
            title={`${name} | ACM at PEC`} 
            heading={branchHeading(branch)} 
            bannerColor={subgroupColor} 
            footerColor={subgroupColor} 
            branch={alias}
            headerImgUrl={`/assets/logos/${alias}.png`}
        >
            <div className={styles.branch} data-branch={branch}>
                <div className={styles.branchInfo}>
                    <div className={styles.content}>
                        <h3>Who are we?</h3>
                        { whoAreWe?.map((content, id) => <p key={id}>{content}</p>) }

                        <h3>What we do?</h3>
                            { whatWeDo?.map((content, id) => <p key={id + 20}>{content}</p>)}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className={styles.subgroupLogo} style={{border: `8px solid ${subgroupColor}`}}>
                    <img
                        src={logoUrl as string}
                        alt={`${name}-logo`}
                        width={250}
                        height={250}
                    />
                </div>
                </div>

                <div className={styles.trendingFromBranch}>
                    <h3>Trending from <code>acm::{alias}</code></h3>
                    <Trending />
                </div>

                <div className={styles.upNext}>
                    <h3>Up Next</h3>
                    <span className={styles.eventCard}>
                        <NextEventCard branch={alias} />    
                    </span>
                </div>
            </div>
        </PageLayout>
    );
}

export async function getServerSideProps({ query }: any) {
    const branch = query.branch;

    if (!Object.keys(BRANCHES).includes(branch)) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }

    const branches = BRANCHES[branch as keyof typeof BRANCHES];

    return {
        props: {
            branch: branch,
            name: branches.name,
            whoAreWe: branches.whoAreWe,
            whatWeDo: branches.whatWeDo,
            logoUrl: `/assets/logos/${branches.alias}.png`,
            alias: branches.alias,
            subgroupColor: branches.color,
        },
    };
}