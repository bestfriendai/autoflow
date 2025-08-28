import { Layout } from '@/components/ui/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function InspectionDetail() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Inspection Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Inspection detail page coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}