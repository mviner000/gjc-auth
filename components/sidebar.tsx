"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BadgeInfo, CircleHelp, PhoneOutgoing, Sticker, Users } from "lucide-react";

import { Playlist } from "@/actions/playlists"
import { useEffect, useState } from "react";
import axios from "axios";
import TopAuthors from "./authors/top-authors";
import { Separator } from "@/components/ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
}

interface Subject {
  id: number;
  subject_name: string;
  book_count: number;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

interface TagProps {
  subject: Subject;
  index: number;
}


const Tag: React.FC<TagProps> = ({ subject, index }) => {
  return (
    <Link
      href={`/tags/${subject.id}`}
      className={`font-medium me-2 px-2.5 py-0.5 'bg-blue-100 text-slate-300 text-sm rounded bg-blue-400 text-blue-300', ${(index)} text-xs`}
    >
      {subject.subject_name}
    </Link>
  );
};

export function Sidebar({ className, playlists }: SidebarProps) {
  const [topSubjects, setTopSubjects] = useState<Subject[]>([]);


  useEffect(() => {
    const fetchTopSubjects = async () => {
      try {
        const response = await axios.get<Subject[]>(`${appUrl}/api/subjects/top`);
        setTopSubjects(response.data);
      } catch (error) {
        console.error('Error fetching top subjects:', error);
      }
    };

    fetchTopSubjects();
  }, []);

  const findSubjectById = (subjectId: number) => {
    return topSubjects.find((subject) => subject.id === subjectId);
  };
  return (
    <div className={cn("pb-12 sidebar", className)}>


      <div className="space-y-3 pr-2">

        <div>Searchbox</div>

        <div className="space-y-5 ">
          <div className="justify-center text-left">
            <h1 className="text-lg text-emerald-600 mb-2 ">Top Tags</h1>
            <div className="grid grid-cols-3 gap-2">
              {topSubjects.map((subject) => (
                <div key={subject.subject_name}>
                  <Link
                    href={`/tags/${subject.id}`}
                  >
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-gray-700/50 dark:text-green-400/80 hover:dark:bg-emerald-700/50 hover:border hover:border-green-400/80">
                      {subject.subject_name.slice(0, 6) + "..."}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Separator className="" />

          <div>
            <h1 className="text-lg text-yellow-600  mb-2">Top Authors</h1>

            <div className="text-sm text-slate-400"><TopAuthors /></div>
          </div>

          <Separator className="hidden" />

          <div className="hidden">

            <div className="space-y-1">
              <Link className="hover:text-blue-500" href="/static/about">
                <Button variant="ghost" className="w-full justify-start text-lg">
                  <BadgeInfo size={20} className="mr-1.5" />
                  About
                </Button>
              </Link>
              <Link className="hover:text-blue-500" href="/static/faqs">
                <Button variant="ghost" className="w-full justify-start text-lg">
                  <CircleHelp size={20} className="mr-1.5" />
                  FAQs
                </Button>
              </Link>
              <Link className="hover:text-blue-500" href="/static/team">
                <Button variant="ghost" className="w-full justify-start text-lg">

                  <Users size={20} className="mr-1.5" />
                  Team
                </Button>
              </Link>
              <Link className="hover:text-blue-500" href="/static/contacts">
                <Button variant="ghost" className="w-full justify-start text-lg">
                  <PhoneOutgoing size={20} className="mr-1.5" />
                  Contacts
                </Button>
              </Link>

              <Link className="hover:text-blue-500" href="/static/terms">
                <Button variant="ghost" className="w-full justify-start text-lg">

                  <Sticker size={20} className="mr-1.5" />
                  Terms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}