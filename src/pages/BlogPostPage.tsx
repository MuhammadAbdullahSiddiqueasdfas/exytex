import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SleekHeader } from '../components/layout/SleekHeader';
import { ElegantFooter } from '../components/layout/ElegantFooter';
import { FloatingActionButton } from '../components/ui/FloatingActionButton';
import { CursorFollower } from '../components/ui/CursorFollower';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag,
  ArrowLeft,
  Share2,
  Eye,
  MessageCircle,
  Heart
} from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    id: 1,
    title: 'The Future of AI in Software Development',
    slug: 'future-ai-software-development',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way we build software, from code generation to automated testing and deployment.',
    content: `
      <p>Artificial Intelligence is transforming the software development landscape at an unprecedented pace. From automated code generation to intelligent testing frameworks, AI is becoming an indispensable tool for developers worldwide.</p>
      
      <h2>The Current State of AI in Development</h2>
      <p>Today's AI-powered development tools are already making significant impacts across the industry. GitHub Copilot, for instance, has revolutionized how developers write code by providing intelligent suggestions and auto-completion features that understand context and intent.</p>
      
      <h2>Key Areas of AI Integration</h2>
      <ul>
        <li><strong>Code Generation:</strong> AI can now generate entire functions and classes based on natural language descriptions</li>
        <li><strong>Bug Detection:</strong> Machine learning algorithms can identify potential bugs and security vulnerabilities before they reach production</li>
        <li><strong>Testing Automation:</strong> AI-driven testing tools can create comprehensive test suites and identify edge cases</li>
        <li><strong>Code Review:</strong> Automated code review systems can provide instant feedback on code quality and best practices</li>
      </ul>
      
      <h2>The Road Ahead</h2>
      <p>As we look toward the future, AI's role in software development will only continue to expand. We can expect to see more sophisticated tools that can understand complex business requirements and translate them into working software solutions.</p>
      
      <p>However, it's important to remember that AI is a tool to augment human creativity and problem-solving, not replace it. The most successful development teams will be those that learn to effectively collaborate with AI systems.</p>
    `,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&auto=format&q=80',
    category: 'AI & ML',
    tags: ['AI', 'Machine Learning', 'Development', 'Future Tech'],
    date: 'December 15, 2024',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format&q=80',
    views: 1250,
    comments: 23,
    likes: 89
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Building Scalable React Applications',
      slug: 'building-scalable-react-applications',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Web Development',
      date: 'December 12, 2024',
      readTime: '12 min read'
    },
    {
      id: 3,
      title: 'Mobile App Security Best Practices',
      slug: 'mobile-app-security-best-practices',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format&q=80',
      category: 'Mobile Apps',
      date: 'December 10, 2024',
      readTime: '10 min read'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>{blogPost.title} | Exytex Technologies Blog</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="keywords" content={blogPost.tags.join(', ')} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={blogPost.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <CursorFollower />
        <SleekHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  to="/blog"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </motion.div>

              {/* Article Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                  <Tag className="w-4 h-4 mr-2" />
                  {blogPost.category}
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {blogPost.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  {blogPost.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center">
                    <img 
                      src={blogPost.authorImage} 
                      alt={blogPost.author}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {blogPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blogPost.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {blogPost.views} views
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      isLiked 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    {blogPost.likes + (isLiked ? 1 : 0)}
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {blogPost.comments}
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Read Article
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <ElegantFooter />
        <FloatingActionButton />
      </div>
    </>
  );
};

export default BlogPostPage;