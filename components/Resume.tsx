import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Resume() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Software Developer Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">2021 - Present</h3>
          <h4 className="text-md font-medium">Senior Full-Stack Developer</h4>
          <h5 className="text-sm italic">TechVision Labs</h5>
          <ul className="list-disc list-inside">
            <li>Leading development of cutting-edge web applications using React, Node.js, and WebGL</li>
            <li>Implemented real-time 3D visualization system</li>
            <li>Reduced loading times by 60%</li>
            <li>Mentored junior developers</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">2019-2021</h3>
          <h4 className="text-md font-medium">Creative Developer</h4>
          <h5 className="text-sm italic">Digital Dreams Studio</h5>
          <ul className="list-disc list-inside">
            <li>Created interactive web experiences and experimental interfaces</li>
            <li>Developed award-winning interactive installations</li>
            <li>Pioneered WebGL-based visualization techniques</li>
            <li>Optimized performance for complex animations</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">2018-2019</h3>
          <h4 className="text-md font-medium">Frontend Developer</h4>
          <h5 className="text-sm italic">Innovation Hub</h5>
          <ul className="list-disc list-inside">
            <li>Built responsive web applications with focus on user experience</li>
            <li>Implemented component library used across projects</li>
            <li>Improved accessibility compliance</li>
            <li>Reduced build times by 40%</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

